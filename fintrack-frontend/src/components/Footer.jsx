export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-4 mt-10">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} FinTrack. All rights reserved.</p>
      </div>
    </footer>
  );
}
