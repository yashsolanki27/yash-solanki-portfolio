"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "@/styles/sections/ContactForm.module.css";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_MESSAGE = 2000;

const SUBJECT_OPTIONS = [
  "Job Opportunity",
  "Freelance / Contract",
  "Consulting",
  "General Inquiry",
  "Other",
];

const VALIDATORS = {
  name: (value) => {
    const v = value.trim();
    if (!v) return "Full name is required.";
    if (v.length < 2) return "Full name must be at least 2 characters.";
    return "";
  },
  email: (value) => {
    const v = value.trim();
    if (!v) return "Email is required.";
    if (!EMAIL_REGEX.test(v))
      return "Enter a valid email address (e.g., name@gmail.com).";
    return "";
  },
  company: () => "",
  subject: (value) => {
    if (!value) return "Subject is required.";
    return "";
  },
  message: (value) => {
    const v = value.trim();
    if (!v) return "Message is required.";
    if (v.length < 10) return "Message must be at least 10 characters.";
    if (v.length > MAX_MESSAGE) return `Message must be ${MAX_MESSAGE} characters or fewer.`;
    return "";
  },
};

const FIELDS = ["name", "email", "company", "subject", "message"];

const INITIAL_VALUES = { name: "", email: "", company: "", subject: "", message: "" };
const INITIAL_ERRORS = { name: "", email: "", company: "", subject: "", message: "" };
const INITIAL_TOUCHED = { name: false, email: false, company: false, subject: false, message: false };

const TOAST_TIMEOUT = 5000;

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [touched, setTouched] = useState(INITIAL_TOUCHED);
  const [toast, setToast] = useState(null);

  const honeypotRef = useRef(null);
  const submittingRef = useRef(false);
  const toastTimer = useRef(null);
  const statusTimer = useRef(null);

  const isValid = useMemo(
    () => FIELDS.every((field) => !VALIDATORS[field](values[field])),
    [values]
  );

  useEffect(
    () => () => {
      clearTimeout(toastTimer.current);
      clearTimeout(statusTimer.current);
    },
    []
  );

  function showToast(type, message) {
    clearTimeout(toastTimer.current);
    setToast({ type, message });
    toastTimer.current = setTimeout(() => setToast(null), TOAST_TIMEOUT);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name]) {
      setErrors((er) => ({ ...er, [name]: VALIDATORS[name](value) }));
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((er) => ({ ...er, [name]: VALIDATORS[name](value) }));
  }

  function computeErrors() {
    const next = { ...INITIAL_ERRORS };
    for (const field of FIELDS) next[field] = VALIDATORS[field](values[field]);
    return next;
  }

  function focusFirstInvalid(errorMap) {
    for (const field of FIELDS) {
      if (errorMap[field]) {
        document.getElementById(`cf-${field}`)?.focus();
        return;
      }
    }
  }

  function handleKeyDown(e) {
    if (e.key !== "Enter" || e.target.tagName === "TEXTAREA") return;
    if (isValid) return;
    e.preventDefault();
    const nextErrors = computeErrors();
    setErrors(nextErrors);
    setTouched({ ...INITIAL_TOUCHED, name: true, email: true, subject: true, message: true });
    focusFirstInvalid(nextErrors);
  }

  function resetForm() {
    setValues(INITIAL_VALUES);
    setErrors(INITIAL_ERRORS);
    setTouched(INITIAL_TOUCHED);
  }

  function scheduleStatusReset(delay = 4000) {
    clearTimeout(statusTimer.current);
    statusTimer.current = setTimeout(() => setStatus("idle"), delay);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (honeypotRef.current?.value) return;

    if (submittingRef.current || status === "submitting") return;

    const nextErrors = computeErrors();
    setErrors(nextErrors);
    setTouched({ ...INITIAL_TOUCHED, name: true, email: true, subject: true, message: true });

    if (FIELDS.some((field) => nextErrors[field])) {
      focusFirstInvalid(nextErrors);
      return;
    }

    if (!ACCESS_KEY) {
      showToast("error", "Form is not configured yet. Please try again later.");
      return;
    }

    submittingRef.current = true;
    setStatus("submitting");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: values.subject.trim(),
          from_name: values.name.trim(),
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          message: values.message.trim(),
        }),
      });

      const result = await res.json();

      if (result.success) {
        setStatus("success");
        resetForm();
        showToast("success", "Message sent — I'll get back to you within 24–48 hours.");
        scheduleStatusReset();
      } else {
        setStatus("error");
        showToast("error", "Something went wrong sending your message. Please try again.");
        scheduleStatusReset();
      }
    } catch (err) {
      setStatus("error");
      showToast("error", "Network error. Please check your connection and try again.");
      scheduleStatusReset();
    } finally {
      submittingRef.current = false;
    }
  }

  const messageCount = values.message.length;
  const nearLimit = messageCount > MAX_MESSAGE * 0.9;
  const btnDisabled = !isValid || status === "submitting" || status === "success";

  function fieldClass(field) {
    let cls =
      field === "message" ? styles.textarea : field === "subject" ? styles.select : styles.input;
    if (errors[field]) cls += ` ${styles.inputError}`;
    else if (touched[field]) cls += ` ${styles.inputValid}`;
    return cls;
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit} onKeyDown={handleKeyDown} noValidate>
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="cf-website">Leave this field empty</label>
          <input
            id="cf-website"
            name="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            ref={honeypotRef}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="cf-name">Full Name *</label>
            <input
              id="cf-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={fieldClass("name")}
              placeholder="e.g. Yash Solanki"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "cf-name-error" : undefined}
            />
            {errors.name && (
              <p id="cf-name-error" className={styles.errorText} role="alert">
                {errors.name}
              </p>
            )}
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="cf-email">Email *</label>
            <input
              id="cf-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={fieldClass("email")}
              placeholder="e.g. yash.solanki@email.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "cf-email-error" : undefined}
            />
            {errors.email && (
              <p id="cf-email-error" className={styles.errorText} role="alert">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="cf-company">Company / Organization</label>
          <input
            id="cf-company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={handleChange}
            onBlur={handleBlur}
            className={fieldClass("company")}
            placeholder='e.g. Company name or "Freelance"'
            aria-describedby="cf-company-hint"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="cf-subject">Subject *</label>
          <select
            id="cf-subject"
            name="subject"
            required
            autoComplete="off"
            value={values.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${fieldClass("subject")} ${
              values.subject === "" ? styles.selectPlaceholder : ""
            }`}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "cf-subject-error" : undefined}
          >
            <option value="" disabled>
              Select a subject…
            </option>
            {SUBJECT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p id="cf-subject-error" className={styles.errorText} role="alert">
              {errors.subject}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="cf-message">Message *</label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={5}
            maxLength={MAX_MESSAGE}
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className={fieldClass("message")}
            placeholder="Tell me about the role, project, tech stack, timeline, and budget (if applicable)…"
            aria-invalid={!!errors.message}
            aria-describedby={
              errors.message
                ? "cf-message-error cf-message-count"
                : "cf-message-count"
            }
          />
          <div className={styles.messageMeta}>
            {errors.message ? (
              <p id="cf-message-error" className={styles.errorText} role="alert">
                {errors.message}
              </p>
            ) : (
              <span />
            )}
            <span
              id="cf-message-count"
              className={`${styles.charCount} ${nearLimit ? styles.charCountWarn : ""}`}
              aria-live="polite"
            >
              {messageCount} / {MAX_MESSAGE}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={btnDisabled}
          className={`${styles.submit} ${styles[status]}`}
        >
          {status === "submitting" ? (
            <>
              <span className={styles.spinner} aria-hidden="true" />
              Sending…
            </>
          ) : status === "success" ? (
            "Message Sent ✓"
          ) : (
            "Send Message →"
          )}
        </button>

        <p className={styles.note}>
          Usually responds within 24–48 hours. Available for full-time, freelance,
          and contract opportunities.
        </p>

        {status === "error" && !ACCESS_KEY && (
          <p className={styles.hint}>
            Form isn&apos;t configured yet — add your Web3Forms access key to .env.local.
          </p>
        )}
      </form>

      {toast && (
        <div
          className={`${styles.toast} ${toast.type === "success" ? styles.toastSuccess : styles.toastError}`}
          role="status"
          aria-live="polite"
        >
          {toast.message}
        </div>
      )}
    </>
  );
}
