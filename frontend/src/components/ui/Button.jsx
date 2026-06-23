function Button({
  children,
  loading,
  type = "button",
}) {
  return (
    <button
      type={type}
      disabled={loading}
      className="
      w-full
      py-3
      rounded-xl
      font-semibold
      text-white
      bg-gradient-to-r
      from-orange-500
      to-red-500
      hover:scale-[1.02]
      hover:shadow-xl
      duration-300
      disabled:opacity-60
      "
    >
      {loading ? "Signing In..." : children}
    </button>
  );
}

export default Button;