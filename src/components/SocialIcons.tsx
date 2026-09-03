export function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M14.5 8.5H16.5V5.5H14.5C12.3 5.5 10.5 7.3 10.5 9.5V11.5H8.5V14.5H10.5V21H13.5V14.5H15.7L16.5 11.5H13.5V9.5C13.5 8.9 13.9 8.5 14.5 8.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="7.5" cy="8" r="1.2" fill="currentColor" />
      <path d="M7.5 11V17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M11 17V13.5C11 12.1 12 11 13.3 11C14.6 11 15.5 12.1 15.5 13.5V17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11 11V17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
