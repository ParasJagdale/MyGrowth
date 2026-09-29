import { useEffect, useRef, useState } from "react";

function LogoAutocomplete({
  id,
  label,
  value,
  onChange,
  suggestions,
  placeholder,
  required = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const autocompleteRef = useRef(null);

  const matchingSuggestions = suggestions.filter((suggestion) =>
    suggestion.name.toLowerCase().includes(value.toLowerCase()),
  );

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        autocompleteRef.current &&
        autocompleteRef.current.contains(event.target) === false
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  function selectSuggestion(suggestion) {
    onChange(suggestion.name);
    setIsOpen(false);
    setHighlightedIndex(-1);
  }

  function handleInputChange(event) {
    onChange(event.target.value);
    setIsOpen(true);
    setHighlightedIndex(-1);
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
      setHighlightedIndex((currentIndex) =>
        Math.min(currentIndex + 1, matchingSuggestions.length - 1),
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((currentIndex) => Math.max(currentIndex - 1, 0));
    }

    if (
      event.key === "Enter" &&
      isOpen &&
      highlightedIndex >= 0 &&
      matchingSuggestions[highlightedIndex]
    ) {
      event.preventDefault();
      selectSuggestion(matchingSuggestions[highlightedIndex]);
    }

    if (event.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  }

  const listId = `${id}-suggestions`;

  return (
    <div className="autocomplete-field" ref={autocompleteRef}>
      <label htmlFor={id}>{label}</label>
      <div className="autocomplete-control">
        <input
          id={id}
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          role="combobox"
          aria-autocomplete="list"
          aria-controls={listId}
          aria-expanded={isOpen}
          autoComplete="off"
          required={required}
        />
        <span className="autocomplete-chevron" aria-hidden="true">⌄</span>
      </div>

      {isOpen && matchingSuggestions.length > 0 && (
        <div className="suggestion-menu" id={listId} role="listbox">
          <p className="suggestion-menu-label">Popular choices</p>
          {matchingSuggestions.map((suggestion, index) => (
            <button
              className={
                index === highlightedIndex
                  ? "suggestion-option highlighted"
                  : "suggestion-option"
              }
              type="button"
              role="option"
              aria-selected={index === highlightedIndex}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => selectSuggestion(suggestion)}
              key={suggestion.name}
            >
              <span className="suggestion-logo">
                <span aria-hidden="true">{suggestion.name.charAt(0)}</span>
                <img
                  src={suggestion.logoUrl}
                  alt=""
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </span>
              <span>{suggestion.name}</span>
              <span className="suggestion-select-text">Select</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LogoAutocomplete;
