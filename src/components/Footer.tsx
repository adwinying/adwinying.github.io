export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black py-3 text-center text-gray-50">
      iAdwin &copy; {year} Adwin Ying.
    </footer>
  );
}
