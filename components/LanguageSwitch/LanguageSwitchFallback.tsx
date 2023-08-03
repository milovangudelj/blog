import { Locale } from '~/i18n.config'

export const LanguageSwitchFallback = ({ lang }: { lang: Locale }) => {
  return (
    <span
      className={`relative inline-flex items-center gap-1 px-4 py-2 text-button opacity-60 transition hover:opacity-100`}
    >
      <span>{lang === 'en' ? 'it' : 'en'}</span>
      <span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="currntColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 1.90625C7.4981 1.90625 6.02993 2.35162 4.78114 3.18603C3.53236 4.02044 2.55905 5.20642 1.98429 6.594C1.40954 7.98157 1.25916 9.50842 1.55217 10.9815C1.84517 12.4545 2.56841 13.8076 3.63041 14.8696C4.69242 15.9316 6.04549 16.6548 7.51854 16.9478C8.99158 17.2408 10.5184 17.0905 11.906 16.5157C13.2936 15.941 14.4796 14.9676 15.314 13.7189C16.1484 12.4701 16.5938 11.0019 16.5938 9.5C16.5915 7.4867 15.7907 5.5565 14.3671 4.13287C12.9435 2.70925 11.0133 1.90848 9 1.90625ZM14.8451 8.65625H12.6253C12.5166 7.03523 12.048 5.45882 11.2535 4.04164C12.2003 4.43427 13.029 5.06591 13.6585 5.87477C14.2881 6.68363 14.6969 7.64204 14.8451 8.65625ZM7.06711 10.3438H10.9343C10.7761 12.2204 10.0906 13.962 9.00141 15.2551C7.90735 13.962 7.22532 12.2204 7.06711 10.3438ZM7.06711 8.65625C7.22532 6.77961 7.90735 5.03797 9 3.74492C10.0927 5.03797 10.7747 6.77961 10.9329 8.65625H7.06711ZM6.75 4.04164C5.95434 5.45853 5.48451 7.03496 5.37469 8.65625H3.15493C3.30341 7.64166 3.71278 6.683 4.34296 5.8741C4.97314 5.06521 5.80255 4.43379 6.75 4.04164ZM3.15493 10.3438H5.37469C5.48451 11.965 5.95434 13.5415 6.75 14.9584C5.80255 14.5662 4.97314 13.9348 4.34296 13.1259C3.71278 12.317 3.30341 11.3583 3.15493 10.3438ZM11.2535 14.9584C12.048 13.5412 12.5166 11.9648 12.6253 10.3438H14.8451C14.6969 11.358 14.2881 12.3164 13.6585 13.1252C13.029 13.9341 12.2003 14.5657 11.2535 14.9584Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </span>
  )
}
