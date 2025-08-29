import Link from "next/link";

export default function NavbarActions() {
  return (
    <div className="actions  items-center gap-3 flex">
      <Link href="/login" className="btn cursor-pointer">
        Login
      </Link>
      <Link href="/register" className="variable-btn nav-border cursor-pointer">
        Register
      </Link>
    </div>
  );
}
