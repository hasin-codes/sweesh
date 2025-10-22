const ShieldLock = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <title>OS Level Encryption</title>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <rect x="10" y="11" width="4" height="5" rx="1" />
        <path d="M10 11V9a2 2 0 1 1 4 0v2" />
    </svg>
);

export default ShieldLock;

