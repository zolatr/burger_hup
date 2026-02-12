import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-primary">BurgerHub</h3>
            <p className="text-secondary-foreground/80 text-sm mb-4">
              En taze burgerleri kapınıza getiren lezzet durağınız. 2020'den beri hizmetinizdeyiz.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Hızlı Bağlantılar</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li><a href="#" className="hover:text-primary transition-colors">Hakkımızda</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Menü</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Kampanyalar</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-bold mb-4">Yardım</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li><a href="#" className="hover:text-primary transition-colors">SSS</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">İletişim</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Gizlilik Politikası</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Kullanım Şartları</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">İletişim</h4>
            <ul className="space-y-3 text-sm text-secondary-foreground/80">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Atatürk Cad. No:123<br />Kadıköy, İstanbul</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+902161234567" className="hover:text-primary transition-colors">
                  +90 216 123 45 67
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:info@burgerhub.com" className="hover:text-primary transition-colors">
                  info@burgerhub.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 pt-8 text-center text-sm text-secondary-foreground/60">
          <p>&copy; 2024 BurgerHub. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
