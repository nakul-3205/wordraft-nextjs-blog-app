import { getServerSession } from "next-auth";
import connectToDBS from "@/lib/db";
import Blog from "@/models/Blog";
import { NextResponse,NextRequest } from "next/server";
import { authOptions } from "@/lib/auth";

