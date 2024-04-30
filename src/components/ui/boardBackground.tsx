export function BoardBackground({
  type
}: {
  type: 'center' | 'top' | 'bottom';
}) {
  if (type === 'center') {
    return (
      <svg className="pointer-events-none absolute inset-0 h-full w-full stroke-gray-400 dark:stroke-muted-foreground opacity-30 [mask-image:radial-gradient(60%_60%_at_center,white,transparent)]">
        <defs>
          <pattern
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none"></path>
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
        ></rect>
      </svg>
    );
  } else if (type === 'top') {
    return (
      <svg className="pointer-events-none absolute inset-0 h-full w-full stroke-gray-400 dark:stroke-muted-foreground opacity-30 [mask-image:radial-gradient(100%_70%_at_top_center,white,transparent)]">
        <defs>
          <pattern
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none"></path>
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
        ></rect>
      </svg>
    );
  } else {
    return (
      <svg className="pointer-events-none absolute inset-0 h-full w-full stroke-gray-400 dark:stroke-muted-foreground opacity-30 [mask-image:radial-gradient(100%_70%_at_bottom_center,white,transparent)]">
        <defs>
          <pattern
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none"></path>
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
        ></rect>
      </svg>
    );
  }
}
