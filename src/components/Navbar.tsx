import { Search, Youtube, Instagram, Facebook, ChevronDown, User, LogOut, LogIn, ShoppingCart, X, CreditCard, QrCode, Truck, ChevronLeft, ArrowRight } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { auth, loginWithGoogle, logout, loginWithEmail, registerWithEmail } from "@/src/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { Link } from "react-router-dom";
import { useCart } from "@/src/contexts/CartContext";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card');
  const [cep, setCep] = useState("");
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    cpf: "",
    cvv: "",
    installments: "1"
  });

  const { cart, removeFromCart, total, clearCart } = useCart();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      setShowAuthModal(false);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      if (authMode === 'login') {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(email, password, name);
      }
      setShowAuthModal(false);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      setAuthError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const calculateShipping = () => {
    if (cep.length === 8) {
      // Mock shipping calculation
      setShippingCost(15.90);
    }
  };

  const handleCheckout = () => {
    alert("Pedido realizado com sucesso! Você receberá um e-mail com os detalhes.");
    clearCart();
    setShowCart(false);
    setCheckoutStep('cart');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start">
            <span className="text-3xl font-black text-primary tracking-tighter">DONUT</span>
            <span className="text-[10px] uppercase tracking-widest text-dark font-medium -mt-1">Cursos & Treinamentos</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-bold text-dark hover:text-primary transition-colors">HOME</Link>
            <Link to="/sobre" className="text-sm font-bold text-dark hover:text-primary transition-colors uppercase">SOBRE NÓS</Link>
            <div className="relative group">
              <button className="flex items-center text-sm font-bold text-dark group-hover:text-primary transition-colors uppercase">
                CURSOS & TREINAMENTOS <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-100 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link to="/#cursos" className="block px-4 py-2 text-sm text-dark hover:bg-light">Cursos Online</Link>
                  <Link to="/#cursos" className="block px-4 py-2 text-sm text-dark hover:bg-light">Treinamentos Corporativos</Link>
                </div>
              </div>
            </div>
            <Link to="/#planos" className="text-sm font-bold text-dark hover:text-primary transition-colors">PLANOS</Link>
            <Link to="/contato" className="text-sm font-bold text-dark hover:text-primary transition-colors">CONTATO</Link>
            <Link to="/ajuda" className="text-sm font-bold text-dark hover:text-primary transition-colors">AJUDA</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-dark hover:text-primary transition-colors relative" onClick={() => setShowCart(true)}>
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            {isAuthReady && (
              user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName || "User"} 
                        className="w-8 h-8 rounded-full border border-gray-200"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                    <span className="hidden sm:inline text-xs font-bold text-dark truncate max-w-[100px]">
                      {user.displayName?.split(' ')[0] || user.email?.split('@')[0]}
                    </span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-primary transition-colors"
                    title="Sair"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-primary/90 transition-all"
                >
                  <LogIn className="w-4 h-4" /> LOGIN
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
              className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black text-dark tracking-tighter">
                    {authMode === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta'}
                  </h2>
                  <button onClick={() => setShowAuthModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleEmailAuth} className="space-y-4">
                  {authMode === 'register' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Nome Completo</label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="Seu Nome"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">E-mail</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Senha</label>
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  {authError && <p className="text-red-500 text-xs font-bold">{authError}</p>}
                  <button className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-all">
                    {authMode === 'login' ? 'Entrar' : 'Cadastrar'}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <span className="text-gray-400 text-sm">Ou continue com</span>
                  <button 
                    onClick={handleGoogleLogin}
                    className="w-full mt-4 flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-all font-bold text-sm"
                  >
                    <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" /> Google
                  </button>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                  <button 
                    onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                    className="text-primary font-bold text-sm hover:underline"
                  >
                    {authMode === 'login' ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {showCart && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
              className="absolute inset-0 bg-dark/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {checkoutStep !== 'cart' && (
                    <button 
                      onClick={() => setCheckoutStep(checkoutStep === 'payment' ? 'shipping' : 'cart')}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}
                  <h2 className="text-xl font-black text-dark tracking-tighter">
                    {checkoutStep === 'cart' ? 'Seu Carrinho' : 
                     checkoutStep === 'shipping' ? 'Entrega' : 'Pagamento'}
                  </h2>
                </div>
                <button onClick={() => { setShowCart(false); setCheckoutStep('cart'); }} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Seu carrinho está vazio.</p>
                  </div>
                ) : checkoutStep === 'cart' ? (
                  <div className="space-y-6">
                    {cart.map((item, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <img src={item.image} alt={item.title} className="w-20 h-20 rounded-xl object-cover" />
                        <div className="flex-grow">
                          <h4 className="font-bold text-dark text-sm leading-tight mb-1">{item.title}</h4>
                          <p className="text-xs text-gray-500 mb-2 line-clamp-2">{item.description}</p>
                          <span className="text-primary font-black">R$ {item.price.toFixed(2)}</span>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : checkoutStep === 'shipping' ? (
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <h3 className="text-sm font-bold text-dark uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Truck className="w-4 h-4" /> Calcular Frete
                      </h3>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Digite seu CEP" 
                          value={cep}
                          onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
                          className="flex-grow px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                        />
                        <button 
                          onClick={calculateShipping}
                          className="bg-dark text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-dark/90 transition-all"
                        >
                          Calcular
                        </button>
                      </div>
                      {shippingCost !== null && (
                        <div className="mt-4 p-3 bg-white rounded-xl border border-gray-100 flex justify-between items-center">
                          <span className="text-sm text-gray-600">Entrega Padrão (3-5 dias)</span>
                          <span className="text-sm font-bold text-primary">R$ {shippingCost.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setPaymentMethod('card')}
                        className={cn(
                          "flex-1 py-3 rounded-xl border font-bold text-sm flex items-center justify-center gap-2 transition-all",
                          paymentMethod === 'card' ? "bg-primary text-white border-primary" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                        )}
                      >
                        <CreditCard className="w-4 h-4" /> Cartão
                      </button>
                      <button 
                        onClick={() => setPaymentMethod('pix')}
                        className={cn(
                          "flex-1 py-3 rounded-xl border font-bold text-sm flex items-center justify-center gap-2 transition-all",
                          paymentMethod === 'pix' ? "bg-primary text-white border-primary" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                        )}
                      >
                        <QrCode className="w-4 h-4" /> PIX
                      </button>
                    </div>

                    {paymentMethod === 'card' ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Número do Cartão</label>
                          <input 
                            type="text" 
                            placeholder="0000 0000 0000 0000"
                            value={cardData.number}
                            onChange={(e) => setCardData({...cardData, number: e.target.value.replace(/\D/g, '').slice(0, 16)})}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Nome Completo (como no cartão)</label>
                          <input 
                            type="text" 
                            placeholder="NOME DO TITULAR"
                            value={cardData.name}
                            onChange={(e) => setCardData({...cardData, name: e.target.value.toUpperCase()})}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">CPF</label>
                            <input 
                              type="text" 
                              placeholder="000.000.000-00"
                              value={cardData.cpf}
                              onChange={(e) => setCardData({...cardData, cpf: e.target.value.replace(/\D/g, '').slice(0, 11)})}
                              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">CVV</label>
                            <input 
                              type="text" 
                              placeholder="000"
                              value={cardData.cvv}
                              onChange={(e) => setCardData({...cardData, cvv: e.target.value.replace(/\D/g, '').slice(0, 3)})}
                              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Parcelas</label>
                          <select 
                            value={cardData.installments}
                            onChange={(e) => setCardData({...cardData, installments: e.target.value})}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                          >
                            {[...Array(12)].map((_, i) => (
                              <option key={i} value={i + 1}>
                                {i + 1}x de R$ {((total + (shippingCost || 0)) / (i + 1)).toFixed(2)} sem juros
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center space-y-4 py-4">
                        <div className="bg-gray-100 p-4 rounded-2xl inline-block">
                          <QrCode className="w-32 h-32 text-dark" />
                        </div>
                        <p className="text-xs text-gray-500 px-8">
                          Escaneie o código acima com o app do seu banco para pagar via PIX. A liberação do curso é imediata.
                        </p>
                        <div className="bg-gray-50 p-3 rounded-xl border border-dashed border-gray-200 text-[10px] font-mono break-all">
                          donut-pix-key-00020126360014br.gov.bcb.pix011400000000000000
                        </div>
                        <button className="text-primary font-bold text-xs hover:underline">
                          Copiar Código PIX
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-gray-50">
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Subtotal</span>
                      <span>R$ {total.toFixed(2)}</span>
                    </div>
                    {shippingCost !== null && (
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Frete</span>
                        <span>R$ {shippingCost.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <span className="text-sm font-bold text-dark uppercase tracking-widest">Total</span>
                      <span className="text-2xl font-black text-dark tracking-tighter">
                        R$ {(total + (shippingCost || 0)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  {checkoutStep === 'cart' ? (
                    <button 
                      onClick={() => setCheckoutStep('shipping')}
                      className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                    >
                      Continuar <ArrowRight className="w-5 h-5" />
                    </button>
                  ) : checkoutStep === 'shipping' ? (
                    <button 
                      onClick={() => setCheckoutStep('payment')}
                      className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                    >
                      Ir para Pagamento <ArrowRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button 
                      onClick={handleCheckout}
                      className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                      {paymentMethod === 'card' ? 'Pagar com Cartão' : 'Já realizei o PIX'}
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}
