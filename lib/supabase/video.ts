import { supabase } from '.'

const TABLE_NAME = "video"

interface VideoData {
  id?: string
  topic: string
  script: string
  avatar: string
  voice: string
  captions: string
  music: string
}

export async function insertVideo(data: VideoData) {
  const { error } = await supabase.from(TABLE_NAME).insert(data)
  if (error) throw error
}