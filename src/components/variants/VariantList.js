import useUtilsFunction from "@hooks/useUtilsFunction";

const VariantList = ({
  att,
  option,
  variants,
  setValue,
  varTitle,
  selectVariant,
  setSelectVariant,
  setSelectVa,
}) => {
  const { showingTranslateValue } = useUtilsFunction();

  const handleChangeVariant = (v) => {
    setValue(v);
    setSelectVariant({
      ...selectVariant,
      [att]: v,
    });
    setSelectVa({ [att]: v });
  };

  const ButtonOptions = () => {
    const uniqueVariants = [
      ...new Map(variants?.map((v) => [v[att], v].filter(Boolean))).values(),
    ].filter(Boolean);

    return uniqueVariants.map((vl, i) =>
      varTitle.map((vr) =>
        vr?.variants?.map(
          (el) =>
            vr?._id === att &&
            el?._id === vl[att] && (
              <button
                onClick={() => handleChangeVariant(vl[att])}
                key={i + 1}
                className={`${
                  Object?.values(selectVariant).includes(vl[att])
                    ? "bg-leather-brown text-leather-white border-2 border-leather-brown rounded-leather inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors"
                    : "bg-leather-cream-100 text-leather-charcoal-600 border-2 border-leather-border rounded-leather inline-flex items-center justify-center px-4 py-2 text-sm font-medium hover:bg-leather-cream-200 transition-colors"
                }`}
              >
                {showingTranslateValue(el.name)}
              </button>
            )
        )
      )
    );
  };

  const DropdownOptions = () => {
    const uniqueVariants = [
      ...new Map(variants.map((v) => [v[att], v].filter(Boolean))).values(),
    ].filter(Boolean);

    return uniqueVariants.map((vl) =>
      varTitle.map((vr) =>
        vr?.variants?.map(
          (el) =>
            vr?._id === att &&
            el?._id === vl[att] && (
              <option key={el._id} value={vl[att]}>
                {showingTranslateValue(el.name)}
              </option>
            )
        )
      )
    );
  };

  return (
    <>
      {option === "Dropdown" ? (
        <select
          onChange={(e) => handleChangeVariant(e.target.value)}
          className="w-full px-3 py-2 form-select outline-none h-12 text-base focus:outline-none rounded-leather bg-leather-cream-100 border-2 border-leather-border focus:bg-leather-white focus:border-leather-brown focus:ring-2 focus:ring-leather-brown-100 transition-colors"
          name="parent"
          value={selectVariant[att] || ""}
        >
          <DropdownOptions />
        </select>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <ButtonOptions />
        </div>
      )}
    </>
  );
};

export default VariantList;
