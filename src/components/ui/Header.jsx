import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    {
      name: 'Home',
      path: '/homepage-premium-it-professional',
      icon: 'Home'
    },
    {
      name: 'About',
      path: '/about-professional-journey',
      icon: 'User'
    },
    {
      name: 'Expertise',
      path: '/technical-expertise-showcase',
      icon: 'Code'
    },
    {
      name: 'Portfolio',
      path: '/project-portfolio-universe',
      icon: 'Briefcase'
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-luxury ${
        isScrolled 
          ? 'bg-background/98 backdrop-blur-lg shadow-luxury border-b border-border' 
          : 'bg-background/95 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link 
            to="/homepage-premium-it-professional" 
            className="flex items-center space-x-3 hover:opacity-90 transition-luxury"
            onClick={closeMenu}
          >
            <div className="relative">
              <div className="w-11 h-11 bg-gradient-to-br from-brand-gold to-brand-copper rounded-xl flex items-center justify-center shadow-luxury">
                <span className="text-primary font-serif font-bold text-lg">S</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-serif font-semibold text-foreground">Samuel</h1>
              <p className="text-xs text-text-secondary -mt-1 font-light">Professional</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-luxury ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-luxury'
                    : 'text-text-secondary hover:text-primary hover:bg-surface'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/collaboration-center-contact-hub">
              <Button 
                variant="outline" 
                size="sm"
                iconName="MessageCircle"
                iconPosition="left"
                iconSize={16}
                className="border-border text-foreground hover:bg-surface hover:border-border"
              >
                Contact
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-xl text-text-secondary hover:text-primary hover:bg-surface transition-luxury"
            aria-label="Toggle menu"
          >
            <Icon name={isMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/98 backdrop-blur-lg">
            <nav className="px-4 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-luxury ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-luxury'
                      : 'text-text-secondary hover:text-primary hover:bg-surface'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </Link>
              ))}
              
              {/* Mobile CTA Buttons */}
              <div className="pt-4 border-t border-border space-y-3">
                <Link to="/collaboration-center-contact-hub" onClick={closeMenu}>
                  <Button 
                    variant="outline" 
                    fullWidth
                    iconName="MessageCircle"
                    iconPosition="left"
                    iconSize={16}
                    className="border-border text-foreground hover:bg-surface"
                  >
                    Contact Me
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
