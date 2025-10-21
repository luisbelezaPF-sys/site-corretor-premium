"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Plus, 
  Edit, 
  Trash2, 
  LogOut, 
  Home, 
  Upload,
  MapPin,
  Bed,
  Bath,
  Square,
  Save,
  X
} from 'lucide-react'

interface Property {
  id: number
  title: string
  type: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  description: string
}

// Dados iniciais (em um app real, viria de uma API/banco de dados)
const initialProperties: Property[] = [
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
  }
]

export default function AdminDashboard() {
  const [properties, setProperties] = useState<Property[]>(initialProperties)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [formData, setFormData] = useState<Omit<Property, 'id'>>({
    title: '',
    type: 'Apartamento',
    price: 0,
    location: '',
    bedrooms: 1,
    bathrooms: 1,
    area: 0,
    image: '',
    description: ''
  })
  const router = useRouter()

  // Verificar autenticação
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth')
    if (!isAuthenticated) {
      router.push('/admin')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin')
  }

  const handleAddProperty = () => {
    const newProperty: Property = {
      ...formData,
      id: Math.max(...properties.map(p => p.id)) + 1
    }
    setProperties([...properties, newProperty])
    setShowAddForm(false)
    resetForm()
  }

  const handleEditProperty = () => {
    if (editingProperty) {
      setProperties(properties.map(p => 
        p.id === editingProperty.id 
          ? { ...formData, id: editingProperty.id }
          : p
      ))
      setEditingProperty(null)
      resetForm()
    }
  }

  const handleDeleteProperty = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este imóvel?')) {
      setProperties(properties.filter(p => p.id !== id))
    }
  }

  const startEdit = (property: Property) => {
    setEditingProperty(property)
    setFormData({
      title: property.title,
      type: property.type,
      price: property.price,
      location: property.location,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      image: property.image,
      description: property.description
    })
    setShowAddForm(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      type: 'Apartamento',
      price: 0,
      location: '',
      bedrooms: 1,
      bathrooms: 1,
      area: 0,
      image: '',
      description: ''
    })
  }

  const cancelForm = () => {
    setShowAddForm(false)
    setEditingProperty(null)
    resetForm()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-full flex items-center justify-center">
              <Home className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Painel Administrativo</h1>
              <p className="text-gray-400 text-sm">Gerenciamento de Imóveis</p>
            </div>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <div className="p-6">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total de Imóveis</p>
                  <p className="text-2xl font-bold text-white">{properties.length}</p>
                </div>
                <Home className="w-8 h-8 text-amber-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Preço Médio</p>
                  <p className="text-2xl font-bold text-white">
                    R$ {Math.round(properties.reduce((acc, p) => acc + p.price, 0) / properties.length).toLocaleString()}
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">R$</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Tipos Disponíveis</p>
                  <p className="text-2xl font-bold text-white">
                    {new Set(properties.map(p => p.type)).size}
                  </p>
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">#</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Property Button */}
        <div className="mb-6">
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-amber-400 to-yellow-600 text-black hover:from-amber-500 hover:to-yellow-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Nova Oferta
          </Button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <Card className="bg-gray-900 border-gray-800 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                {editingProperty ? 'Editar Imóvel' : 'Adicionar Nova Oferta'}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={cancelForm}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Título do Imóvel
                  </label>
                  <Input
                    placeholder="Ex: Apartamento Luxuoso Centro"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tipo de Imóvel
                  </label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Apartamento">Apartamento</SelectItem>
                      <SelectItem value="Casa">Casa</SelectItem>
                      <SelectItem value="Cobertura">Cobertura</SelectItem>
                      <SelectItem value="Kitnet">Kitnet</SelectItem>
                      <SelectItem value="Comercial">Comercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Preço (R$/mês)
                  </label>
                  <Input
                    type="number"
                    placeholder="2500"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Localização
                  </label>
                  <Input
                    placeholder="Ex: Centro, Alfenas"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Quartos
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.bedrooms || ''}
                    onChange={(e) => setFormData({...formData, bedrooms: Number(e.target.value)})}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Banheiros
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.bathrooms || ''}
                    onChange={(e) => setFormData({...formData, bathrooms: Number(e.target.value)})}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Área (m²)
                  </label>
                  <Input
                    type="number"
                    placeholder="120"
                    value={formData.area || ''}
                    onChange={(e) => setFormData({...formData, area: Number(e.target.value)})}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  URL da Foto
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="https://images.unsplash.com/photo-..."
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white flex-1"
                  />
                  <Button 
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-gray-500 text-xs mt-1">
                  Cole a URL de uma imagem ou use o botão para fazer upload
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descrição
                </label>
                <Textarea
                  placeholder="Descreva as características e diferenciais do imóvel..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={editingProperty ? handleEditProperty : handleAddProperty}
                  className="bg-gradient-to-r from-amber-400 to-yellow-600 text-black hover:from-amber-500 hover:to-yellow-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingProperty ? 'Salvar Alterações' : 'Adicionar Imóvel'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={cancelForm}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Properties List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="bg-gray-900 border-gray-800 overflow-hidden">
              <div className="relative">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-amber-400 text-black">
                  {property.type}
                </Badge>
                <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm font-semibold">
                  R$ {property.price.toLocaleString()}/mês
                </div>
              </div>
              <CardContent className="p-4">
                <h4 className="text-lg font-semibold text-white mb-2">{property.title}</h4>
                <div className="flex items-center text-gray-400 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">{property.description}</p>
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
                    size="sm"
                    onClick={() => startEdit(property)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button 
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteProperty(property.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {properties.length === 0 && (
          <div className="text-center py-12">
            <Home className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Nenhum imóvel cadastrado ainda.</p>
            <p className="text-gray-500">Clique em "Adicionar Nova Oferta" para começar.</p>
          </div>
        )}
      </div>
    </div>
  )
}