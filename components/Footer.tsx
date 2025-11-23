import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-muted text-foreground py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Maltopia</h3>
            <p className="text-sm opacity-90">
              Arsip digital budaya Topeng Malangan, melestarikan warisan seni
              tradisional Malang untuk generasi mendatang.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li>

              </li>
              <li>
                <Link href="/katalog" className="hover:text-primary transition-colors">
                  Katalog Topeng
                </Link>
              </li>
              <li>
                <Link href="/arsip" className="hover:text-primary transition-colors">
                  Arsip Cerita
                </Link>
              </li>
              <li>
                <Link href="/dokumentasi" className="hover:text-primary transition-colors">
                  Dokumentasi Tari
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">Kontak</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Sanggar Asmorobangun<br />
              Malang, Jawa Timur
            </p>
            <p className="text-sm text-muted-foreground">
              Didukung oleh komunitas budaya lokal dan akademisi
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Maltopia. Semua hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;