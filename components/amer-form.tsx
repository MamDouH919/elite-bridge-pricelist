"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"

interface AmerService {
  _id?: string
  name: string
  nameAr?: string
  price: number
}

const defaultAmerData: AmerService[] = [
  { name: "NEW ESTABLISHMENT CARD", price: 476 },
  { name: "RENEW ESTABLISHMENT CARD", price: 576 },
  { name: "MODEFY ESTABLISHMENT CARD", price: 376 },
  { name: "ENTRY PERMIT (INSIDE COUNTRY)", price: 1126 },
  { name: "ENTRY PERMIT (OUTSIDE COUNTRY)", price: 476 },
  { name: "CHANGE STATUS", price: 676 },
  { name: "VISA STAMPING", price: 547 },
  { name: "TEMOPARY CLOSURE WITH ABSCONDING", price: 456 },
  { name: "RETURN PERMIT FOR RESIDENT", price: 726 },
  { name: "OPEN FILE", price: 283 },
  { name: "ENTRY PERMIT FOR FAMILY(INSIDE COUNTRY)", price: 1089 },
  { name: "ENTRY PERMIT FOR FAMILY(OUTSIDE COUNTRY)", price: 440 },
  { name: "CANCELATION (INSIDE COUNTRY)", price: 226 },
  { name: "CANCELATION (OUTSIDE COUNTRY)", price: 326 },
  { name: "REDUCEFINE EMPLOYEE", price: 326 },
  { name: "CANCELATION (INSIDE COUNTRY) FOR FAMILY", price: 189 },
  { name: "CANCELATION (OUTSIDE COUNTRY) FOR FAMILY", price: 289 },
  { name: "REDUCEFINE FOR FAMILY", price: 289 },
  { name: "BANK GUARANTY", price: 3000 },
  { name: "BANK INSURANCE FOR", price: 5000 },
  { name: "GOLDEN VISA MANAGER", price: 2710 },
  { name: "EID 1 YEAR", price: 285 },
  { name: "EID 2 YEAR", price: 385 },
  { name: "EID 10 YEARS FOR GOLDEN VISA", price: 1185 },
  { name: "EID 5 YEARS FOR EMIRATS", price: 185 },
  { name: "EID 10 YEARS FOR EMIRATS", price: 285 },
  { name: "MEDICAL TEST EHS", price: 338 },
  { name: "MEDICAL TEST DHA", price: 343 },
  { name: "MEDICAL TEST VIP", price: 750 },
]

export default function AmerForm() {
  const [services, setServices] = useState<AmerService[]>(defaultAmerData)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/services?type=amer")
      if (response.ok) {
        const data = await response.json()
        setServices(data.length > 0 ? data : defaultAmerData)
      }
    } catch (error) {
      console.error("Failed to fetch AMER services:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (index: number, field: keyof AmerService, value: any) => {
    const updated = [...services]
    updated[index] = { ...updated[index], [field]: value }
    setServices(updated)
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const response = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "amer", services }),
      })

      if (response.ok) {
        alert("AMER services saved successfully!")
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
                  type="number"
                  value={service.price}
                  onChange={(e) => handleInputChange(index, "price", Number.parseFloat(e.target.value) || 0)}
                  placeholder="Price"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={handleSave} className="w-full mt-6" disabled={saving}>
        {saving ? "Saving..." : "Save AMER Services"}
      </Button>
    </div>
  )
}
