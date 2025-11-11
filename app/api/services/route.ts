import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not set")
}

const client = new MongoClient(MONGODB_URI)

async function getDB() {
  await client.connect()
  return client.db("service_pricing")
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") // 'amer' or 'tasheel'

    const db = await getDB()
    const collection = db.collection(type || "amer")

    const services = await collection.find({}).toArray()

    return NextResponse.json(services)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { type, services } = await request.json()

    if (!type || !services) {
      return NextResponse.json({ error: "Missing type or services" }, { status: 400 })
    }

    const db = await getDB()
    const collection = db.collection(type)

    // Clear existing and insert new services
    await collection.deleteMany({})
    const result = await collection.insertMany(services)

    return NextResponse.json({
      success: true,
      insertedCount: result.insertedCount,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to save services" }, { status: 500 })
  }
}
