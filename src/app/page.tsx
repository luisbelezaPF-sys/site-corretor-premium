"use client"

import { useState, useEffect, useCallback } from 'react'
import { Search, MapPin, Bed, Bath, Square, Phone, Mail, MessageCircle, Star, Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Dados mock dos imóveis
const properties = [
  {
    id: 1,
    title: "Apartamento Luxuoso Centro",
    type: "Apartamento",
    price: 2500,
    location: "Centro, Alfenas",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    description: "Apartamento moderno no coração de Alfenas, com acabamentos de primeira qualidade."
  },
  {
    id: 2,
    title: "Casa Familiar Jardim Europa",
    type: "Casa",
    price: 3200,
    location: "Jardim Europa, Alfenas",
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
    description: "Casa espaçosa em bairro nobre, ideal para famílias que buscam conforto e segurança."
  },
  {
    id: 3,
    title: "Cobertura Vista Panorâmica",
    type: "Cobertura",
    price: 4500,
    location: "Alto da Colina, Alfenas",
    bedrooms: 3,
    bathrooms: 3,
    area: 200,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
    description: "Cobertura exclusiva com vista panorâmica da cidade e área de lazer completa."
  },
  {
    id: 4,
    title: "Kitnet Estudantil",
    type: "Kitnet",
    price: 800,
    location: "Próximo UNIFAL, Alfenas",
    bedrooms: 1,
    bathrooms: 1,
    area: 35,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    description: "Kitnet moderna e funcional, perfeita para estudantes universitários."
  },
  {
    id: 5,
    title: "Casa Comercial Centro",
    type: "Comercial",
    price: 5000,
    location: "Centro Comercial, Alfenas",
    bedrooms: 0,
    bathrooms: 2,
    area: 150,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    description: "Imóvel comercial em localização privilegiada, ideal para escritórios ou consultórios."
  },
  {
    id: 6,
    title: "Apartamento Novo Residencial",
    type: "Apartamento",
    price: 1800,
    location: "Residencial Morada do Sol, Alfenas",
    bedrooms: 2,
    bathrooms: 1,
    area: 65,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    description: "Apartamento novo em condomínio fechado com área de lazer completa."
  }
]

const testimonials = [
  {
    name: "Maria Silva",
    text: "Raphael foi excepcional! Encontrou o imóvel perfeito para minha família em tempo recorde.",
    rating: 5
  },
  {
    name: "João Santos",
    text: "Profissional ético e transparente. Recomendo seus serviços sem hesitação.",
    rating: 5
  },
  {
    name: "Ana Costa",
    text: "Atendimento personalizado e conhecimento profundo do mercado local.",
    rating: 5
  },
  {
    name: "Carlos Mendes",
    text: "Excelente corretor! Me ajudou a encontrar a casa dos meus sonhos rapidamente.",
    rating: 5
  },
  {
    name: "Fernanda Lima",
    text: "Atendimento impecável e muita dedicação. Super recomendo!",
    rating: 5
  },
  {
    name: "Felipe Borges",
    text: "Batman você salvou meu fds , casa top",
    rating: 5
  }
]

export default function Home() {
  const [filteredProperties, setFilteredProperties] = useState(properties)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  })

  // Filtrar imóveis de forma síncrona
  const filterProperties = useCallback(() => {
    let filtered = [...properties]

    if (searchTerm) {
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter(property => property.type === typeFilter)
    }

    if (priceFilter !== "all") {
      if (priceFilter === "low") {
        filtered = filtered.filter(property => property.price <= 1500)
      } else if (priceFilter === "medium") {
        filtered = filtered.filter(property => property.price > 1500 && property.price <= 3000)
      } else if (priceFilter === "high") {
        filtered = filtered.filter(property => property.price > 3000)
      }
    }

    setFilteredProperties(filtered)
  }, [searchTerm, typeFilter, priceFilter])

  // Aplicar filtros imediatamente quando mudarem
  useEffect(() => {
    filterProperties()
  }, [filterProperties])

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const whatsappMessage = `Olá Raphael! Meu nome é ${contactForm.name}. ${contactForm.message}. Meu telefone: ${contactForm.phone}, email: ${contactForm.email}`
    const whatsappUrl = `https://wa.me/5535988326287?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, '_blank')
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-3 border-amber-400 shadow-2xl ring-2 ring-amber-400/30">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/98151d4c-ed90-4ddc-880d-91da5a90f5cb.png" 
                  alt="Raphael Augusto de Lima Barbosa - Corretor de Imóveis" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white">Raphael Augusto</h1>
                <p className="text-sm md:text-base text-gray-400">Corretor de Imóveis</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-amber-400 transition-colors">
                Sobre
              </button>
              <button onClick={() => scrollToSection('properties')} className="text-gray-300 hover:text-amber-400 transition-colors">
                Imóveis
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-300 hover:text-amber-400 transition-colors">
                Depoimentos
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-amber-400 transition-colors">
                Contato
              </button>
            </nav>
            <Button 
              onClick={() => window.open('https://wa.me/5535988326287', '_blank')}
              className="bg-gradient-to-r from-amber-400 to-yellow-600 text-black hover:from-amber-500 hover:to-yellow-700"
            >
              Fale Comigo
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 md:pt-36 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-amber-400 bg-clip-text text-transparent">
              A casa certa para
              <br />
              <span className="text-amber-400">momentos inesquecíveis em Alfenas!</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Com mais de uma década de experiência no mercado imobiliário de Alfenas, 
              ofereço atendimento personalizado e soluções sob medida para você.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => scrollToSection('properties')}
                size="lg" 
                className="bg-gradient-to-r from-amber-400 to-yellow-600 text-black hover:from-amber-500 hover:to-yellow-700"
              >
                Ver Imóveis Disponíveis
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')}
                size="lg" 
                variant="outline" 
                className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black"
              >
                Agendar Visita
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-amber-400">
              Sobre Raphael Augusto
            </h3>
            <div className="bg-black/50 rounded-2xl p-8 border border-gray-800">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                <strong className="text-white">Raphael Augusto de Lima Barbosa</strong> é um corretor centrado, ético e experiente, 
                que contribuiu para a ascensão do mercado imobiliário em Alfenas. Com foco na transparência 
                e no atendimento personalizado, construiu uma sólida reputação baseada na confiança e 
                no conhecimento profundo do mercado local.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-black" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Ética Profissional</h4>
                  <p className="text-gray-400">Transparência e honestidade em todas as negociações</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-black" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Conhecimento Local</h4>
                  <p className="text-gray-400">Expertise no mercado imobiliário de Alfenas</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-black" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Atendimento Premium</h4>
                  <p className="text-gray-400">Suporte personalizado do início ao fim</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-amber-400">
              Imóveis para Locação
            </h3>
            <p className="text-gray-300 text-lg">
              Descubra as melhores opções de imóveis em Alfenas
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Buscar por localização ou tipo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-800">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Imóvel</label>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os tipos</SelectItem>
                        <SelectItem value="Apartamento">Apartamento</SelectItem>
                        <SelectItem value="Casa">Casa</SelectItem>
                        <SelectItem value="Cobertura">Cobertura</SelectItem>
                        <SelectItem value="Kitnet">Kitnet</SelectItem>
                        <SelectItem value="Comercial">Comercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Faixa de Preço</label>
                    <Select value={priceFilter} onValueChange={setPriceFilter}>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as faixas</SelectItem>
                        <SelectItem value="low">Até R$ 1.500</SelectItem>
                        <SelectItem value="medium">R$ 1.500 - R$ 3.000</SelectItem>
                        <SelectItem value="high">Acima de R$ 3.000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Properties Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <Card key={property.id} className="bg-gray-900 border-gray-800 overflow-hidden hover:border-amber-400 transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-amber-400 text-black">
                    {property.type}
                  </Badge>
                  <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm font-semibold">
                    R$ {property.price.toLocaleString()}/mês
                  </div>
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-white mb-2">{property.title}</h4>
                  <div className="flex items-center text-gray-400 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{property.description}</p>
                  <div className="flex items-center justify-between text-gray-400 text-sm mb-4">
                    {property.bedrooms > 0 && (
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        <span>{property.bedrooms}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      <span>{property.area}m²</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-amber-400 to-yellow-600 text-black hover:from-amber-500 hover:to-yellow-700"
                      onClick={() => {
                        const message = `Olá Raphael! Tenho interesse no imóvel: ${property.title} - ${property.location}. Gostaria de mais informações.`
                        window.open(`https://wa.me/5535988326287?text=${encodeURIComponent(message)}`, '_blank')
                      }}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contato
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">Nenhum imóvel encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-amber-400">
              Depoimentos de Clientes
            </h3>
            <p className="text-gray-300 text-lg">
              Veja o que nossos clientes dizem sobre nossos serviços
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-black/50 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                  <p className="text-amber-400 font-semibold">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-amber-400">
                Entre em Contato
              </h3>
              <p className="text-gray-300 text-lg">
                Pronto para encontrar seu próximo imóvel? Vamos conversar!
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-semibold text-white mb-6">Informações de Contato</h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-amber-400 mr-3" />
                    <div>
                      <p className="text-white font-medium">(35) 98832-6287</p>
                      <p className="text-gray-400 text-sm">WhatsApp disponível</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-amber-400 mr-3" />
                    <div>
                      <p className="text-white font-medium">raphael@corretor.com</p>
                      <p className="text-gray-400 text-sm">Resposta em até 2 horas</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 text-amber-400 mr-3" />
                    <div>
                      <p className="text-white font-medium">Centro, Alfenas - MG</p>
                      <p className="text-gray-400 text-sm">Atendimento presencial</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Seu nome completo"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="bg-gray-900 border-gray-700 text-white placeholder-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Seu telefone"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                      className="bg-gray-900 border-gray-700 text-white placeholder-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Seu e-mail"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="bg-gray-900 border-gray-700 text-white placeholder-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Sua mensagem..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 min-h-[120px]"
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-400 to-yellow-600 text-black hover:from-amber-500 hover:to-yellow-700"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Enviar via WhatsApp
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/98151d4c-ed90-4ddc-880d-91da5a90f5cb.png" 
                  alt="Raphael Augusto" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-white font-semibold">Raphael Augusto de Lima Barbosa</p>
                <p className="text-gray-400 text-sm">CRECI: 123456-MG</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2024 Raphael Augusto - Corretor de Imóveis
              </p>
              <p className="text-gray-500 text-xs">
                Todos os direitos reservados
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}