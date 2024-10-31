const apiInstance = async (endpoint:string, { method = 'GET', body = undefined, headers = {} }:RequestInit = {}) => {
  // 기본 헤더 설정 (필요 시 추가)
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  // GET 요청인 경우 Content-Type 헤더와 body를 제거
  const config:RequestInit = {
    method,
    headers: method.toUpperCase() === 'GET' ? {} : defaultHeaders,
    body
  };

  // body가 있는 경우 JSON.stringify
  if (body && method.toUpperCase() !== 'GET') {
    config.body = body;
  }

  try {
    const response = await fetch(`${endpoint}`, config);

    // 응답이 성공적이지 않은 경우 에러 처리
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'API 요청 실패');
    }

    // 응답 데이터 반환 (JSON 형식)
    return response.json();
  } catch (error) {
    console.error('API 요청 에러:', error);
    throw error;
  }
};

export default apiInstance;
