import { homeDemos, mainNav, NavItem } from "@/config/navigation";
import Image from "next/image";
import Link from "next/link";

const HomeDemosMenu = () => (
  <ul className="submenu has-homemenu">
    <li>
      <div className="homemenu-items">
        {homeDemos.map((demo) => (
          <div className="homemenu" key={demo.id}>
            <div className={`homemenu-thumb ${demo.id > 1 ? "mb-15" : ""}`}>
              <Image
                src={demo.thumbnail}
                width={0}
                height={0}
                sizes="(min-width: 1200px) 25vw, 100vw"
                style={{ width: "100%", height: "auto" }}
                alt={`${demo.label} preview`}
              />
              <div className="demo-button">
                <Link href={demo.href} className="theme-btn">
                  <span>View Demo</span>
                </Link>
              </div>
            </div>
            <div className="homemenu-content text-center">
              <h4 className="homemenu-title">{demo.label}</h4>
            </div>
          </div>
        ))}
      </div>
    </li>
  </ul>
);

const NavLinks = ({ items }: { items: NavItem[] }) => (
  <>
    {items.map((item) => (
      <li key={item.label} className={item.children ? "has-dropdown" : undefined}>
        <Link href={item.href}>
          {item.label}
          {item.children && <i className="fas fa-angle-down" />}
        </Link>
        {item.children && (
          <ul className="submenu">
            <NavLinks items={item.children} />
          </ul>
        )}
      </li>
    ))}
  </>
);

const [homeItem, ...otherItems] = mainNav;

/** Desktop navigation (xl and up). The Home entry renders a thumbnail mega-menu. */
const DesktopNav = () => (
  <div className="main-menu d-none d-xl-block">
    <nav id="mobile-menu" aria-label="Main">
      <ul>
        <li className="has-dropdown menu-thumb">
          <Link href={homeItem.href}>
            {homeItem.label}
            <i className="fas fa-angle-down" />
          </Link>
          <HomeDemosMenu />
        </li>
        <NavLinks items={otherItems} />
      </ul>
    </nav>
  </div>
);

export default DesktopNav;
