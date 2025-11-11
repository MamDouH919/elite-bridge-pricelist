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
  price: number
}

const defaultTasheelData: TasheelService[] = [
  { name: "COMPANY FEES", price: 115 },
  { name: "NEW E-SIGNATURE CARD", price: 115 },
  { name: "PRO CARD", price: 115 },
  { name: "QUOTA MODIFY", price: 76 },
  { name: "NEW QUOTA", price: 76 },
  { name: "QUOTA CANCELATION", price: 76 },
  { name: "WORK PERMIT (Golden visa,family visa)", price: 128 },
  { name: "WORK PERMIT (1 YEAR & 6 MONTHS)", price: 128 },
  { name: "RENEWAL TYPING", price: 76 },
  { name: "RENEWAL OFFICER LITTER", price: 126 },
  { name: "GCC OFFER LETTER", price: 40 },
  { name: "CERTIFICATE IT WHOM IT MAY CONCERN", price: 18 },
  { name: "BIRTH TIME LABOUR FEES", price: 76 },
  { name: "WORK PERMIT /LABOUR FEES (GOLDEN VISA,FAMILY VISA)", price: 326 },
  { name: "INSPECTION", price: 485 },
  { name: "CANCELLATION SUBMISSION", price: 76 },
  { name: "RENEWAL SUBMISSION (category 2)", price: 1285 },
  { name: "RENEWAL SUBMISSION (category 3)", price: 3550 },
  { name: "TAW-JEEH", price: 153 },
  { name: "MODIFICATION SUBMISSION", price: 76 },
  { name: "WORK PERMIT SUBMISSION (GOLDEN VISA,FAMILY VISA)", price: 76 },
  { name: "UPDATE PRE-APPROVAL", price: 76 },
  { name: "GCC SUBMISSION", price: 40 },
  { name: "PART-TIME SUBMISSION", price: 40 },
  { name: "ABSCONDING REMOVE", price: 76 },
  { name: "ABSCONDING REMOVAL SUBMISSION", price: 19 },
  { name: "LABOUR CANCELLATION", price: 76 },
  { name: "UNDO CANCELLATION", price: 76 },
  { name: "UPDATE PERSONAL INFORMATION", price: 76 },
  { name: "FILE NO. UPDATE", price: 18 },
  { name: "PERSONAL NUMBER", price: 76 },
  { name: "GENERAL REPORT ABOUT THE COMPANY", price: 19 },
  { name: "EMPLOYEE LIST", price: 19 },
  { name: "EMPLOYER LIST", price: 19 },
  { name: "SIGNATURE CERTIFICATE", price: 19 },
  { name: "TAW-TEEN REPORT", price: 19 },
  { name: "CUSTOMER SERVICES", price: 38 },
  { name: "OFFER LETTER", price: 276 },
  { name: "LABOUR FEES (category 2 )", price: 1285 },
  { name: "LABOUR FEES (category 3)", price: 3550 },
  { name: "OPEN NEW FILE (company)", price: 523 },
  { name: "COMPANY UPDATE", price: 523 },
]

export default function TasheelForm() {
  const [services, setServices] = useState<TasheelService[]>(defaultTasheelData)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/services?type=tasheel")
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
      const response = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "tasheel", services }),
      })

      if (response.ok) {
        alert("TASHEEL services saved successfully!")
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
        {saving ? "Saving..." : "Save TASHEEL Services"}
      </Button>
    </div>
  )
}
