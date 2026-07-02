type Props = { className?: string; size?: number };

export function LaurelLeft({ className, size = 80 }: Props) {
  return (
    <svg
      viewBox="0 0 220 220"
      width={size}
      height={size}
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d="M52 198 C82 152 104 108 126 42"
        stroke="currentColor"
        strokeWidth="8"
      />
      <g fill="currentColor" fillOpacity="0.54" stroke="currentColor" strokeWidth="2.25">
        <path d="M124 75 C105 45 111 14 131 11 C145 9 153 22 151 40 C164 27 183 31 188 47 C195 70 165 91 128 88 C126 84 125 79 124 75Z" />
        <path d="M93 124 C66 113 58 84 74 75 C87 68 98 79 99 97 C108 82 123 87 127 103 C132 125 107 138 94 131 C93 129 93 126 93 124Z" />
        <path d="M114 113 C134 91 165 87 177 104 C188 120 165 136 141 134 C160 141 169 154 158 167 C143 184 114 157 108 136 C109 127 111 119 114 113Z" />
        <path d="M66 176 C40 162 35 132 51 124 C65 117 75 132 74 151 C84 137 99 142 102 158 C106 179 82 193 68 183 C67 181 66 178 66 176Z" />
        <path d="M90 162 C111 140 142 136 154 152 C165 168 142 183 119 181 C137 188 145 201 134 212 C119 227 91 201 85 182 C85 174 87 168 90 162Z" />
      </g>
      <g stroke="currentColor" strokeWidth="5" opacity="0.78">
        <path d="M132 76 L143 43" />
        <path d="M139 63 L165 40" />
        <path d="M100 126 L76 101" />
        <path d="M101 124 L106 99" />
        <path d="M117 136 L158 108" />
        <path d="M125 128 L160 128" />
        <path d="M72 178 L59 151" />
        <path d="M73 177 L83 151" />
        <path d="M91 185 L133 160" />
        <path d="M101 178 L133 178" />
      </g>
      <g stroke="#fffdf8" strokeWidth="5" opacity="0.5">
        <path d="M127 27 C123 34 122 42 124 50" />
        <path d="M70 101 C75 109 81 115 88 118" />
        <path d="M151 101 C158 99 166 101 171 106" />
        <path d="M51 151 C48 160 50 168 55 174" />
        <path d="M119 197 C126 199 133 197 138 193" />
      </g>
    </svg>
  );
}
