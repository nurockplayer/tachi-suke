import type { APIRoute } from "astro";
import { searchIndexResponse } from "@/lib/content/search";

export const prerender = true;

export const GET: APIRoute = async () => searchIndexResponse("zh-tw");
