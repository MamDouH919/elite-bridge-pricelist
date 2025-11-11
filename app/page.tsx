"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AmerForm from "@/components/amer-form"
import TasheelForm from "@/components/tasheel-form"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Service Pricing Manager</h1>
          <p className="text-gray-600">Manage AMER and TAS-HEEL service prices</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <Tabs defaultValue="amer" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="amer">AMER Services</TabsTrigger>
              <TabsTrigger value="tasheel">TAS-HEEL Services</TabsTrigger>
            </TabsList>

            <TabsContent value="amer" className="mt-6">
              <AmerForm />
            </TabsContent>

            <TabsContent value="tasheel" className="mt-6">
              <TasheelForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
