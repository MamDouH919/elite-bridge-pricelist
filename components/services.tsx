"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"

interface TasheelService {
  _id?: string
  name: string
  nameAr?: string
  phone: string
}

const defaultTasheelData: TasheelService[] = [
  {
    name: "TAS-HEEL Services",
    nameAr: "تسهيل",
    phone: ""
  },
  {
    name: "TAW-JEEH Services",
    nameAr: "توجيه",
    phone: ""
  },
  {
    name: "Amer Services",
    nameAr: "امر",
    phone: ""
  },
  {
    name: "Commercial Office Rent",
    nameAr: "توفير المكاتب التجارية",
    phone: ""
  },
  {
    name: "DED Services",
    nameAr: "خدمة دائرة التنمية الاقتصادية",
    phone: ""
  },
  {
    name: "Immigration & Visa Services",
    nameAr: "خدمات الهجرة والتأشيرات",
    phone: ""
  },
  {
    name: "Ministry Of Labor Services",
    nameAr: "خدمات وزارة الموارد البشرية والتوطين",
    phone: ""
  },
  {
    name: "Municipality Services",
    nameAr: "خدمات البلدية",
    phone: ""
  },
  {
    name: "Translation Services",
    nameAr: "خدمات الترجمة",
    phone: ""
  },
  {
    name: "Medical Insurance Services",
    nameAr: "خدمات التأمين الطبي",
    phone: ""
  },
  {
    name: "RTA Services",
    nameAr: "خدمات هيئة الطرق والمواصلات",
    phone: ""
  },
  {
    name: "PRO Services",
    nameAr: "خدمات تخليص المعاملات الحكومية",
    phone: ""
  },
  {
    name: "Emirates id services",
    nameAr: "خدمات الهويه الاماراتيه",
    phone: ""
  }
]


export default function ServicesForm() {
  const [services, setServices] = useState<TasheelService[]>(defaultTasheelData)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/services-data")
      if (response.ok) {
        const data = await response.json()
        setServices(data.length > 0 ? data : defaultTasheelData)
      }
    } catch (error) {
      console.error("Failed to fetch TASHEEL services:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (index: number, field: keyof TasheelService, value: any) => {
    const updated = [...services]
    updated[index] = { ...updated[index], [field]: value }
    setServices(updated)
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const response = await fetch("/api/services-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({  services }),
      })

      if (response.ok) {
        alert("services saved successfully!")
      } else {
        alert("Failed to save services")
      }
    } catch (error) {
      console.error("Error saving services:", error)
      alert("Error saving services")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {services.map((service, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Name (EN)</label>
                <Input
                  value={service.name}
                  onChange={(e) => handleInputChange(index, "name", e.target.value)}
                  placeholder="Service name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Name (AR)</label>
                <Input
                  value={service.nameAr || ""}
                  onChange={(e) => handleInputChange(index, "nameAr", e.target.value)}
                  placeholder="Arabic name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <Input
                  value={service.phone}
                  onChange={(e) => handleInputChange(index, "phone", e.target.value)}
                  placeholder="Price"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={handleSave} className="w-full mt-6" disabled={saving}>
        {saving ? "Saving..." : "Save Services"}
      </Button>
    </div>
  )
}
