import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  // 쿼리 파라미터에서 데이터 가져오기
  const searchParams = new URL(request.url).searchParams
  // const searchTerm = searchParams.get('searchTerm') || '' // searchTerm 매개변수 추출

  try {
    // 외부 API로 통신
    const response = await axios.get(
      `https://19e3-223-131-171-229.ngrok-free.app/price`,
    )
    return new NextResponse(JSON.stringify(response.data), {
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return new NextResponse('server error', {
      status: 500,
    })
  }
}