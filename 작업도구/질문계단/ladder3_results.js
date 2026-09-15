window.LADDER3_RESULTS = {
 "a1": {
  "half": {
   "ms": 2575,
   "model": "gemini-3.6-flash",
   "verdict": "partial",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "비 제곱 빼기 사 에이 씨"
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "",
   "ack": "판별식이 b²−4ac라는 걸 잘 말했어!",
   "say": "판별식이 b²−4ac라는 걸 잘 말했어! 그 식이 양수인지 음수인지를 보면 근에 대해 무엇을 알 수 있을까?",
   "parsed": true
  },
  "wrong": {
   "ms": 2511,
   "model": "gemini-3.6-flash",
   "verdict": "none",
   "hits": [
    {
     "id": "a",
     "hit": false,
     "evidence": ""
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "판별식을 두 근의 합과 곱을 알려주는 식으로 생각함",
   "ack": "아, 그렇게 생각했구나.",
   "say": "아, 그렇게 생각했구나. 근의 공식에서 √ 안에 들어 있던 식이 뭐였지?",
   "parsed": true
  },
  "full": {
   "ms": 2062,
   "model": "gemini-3.6-flash",
   "verdict": "pass",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "근의 공식의 근호(√) 안에 있는 식 b²−4ac 이다"
    },
    {
     "id": "b",
     "hit": true,
     "evidence": "그 식의 부호로 근이 실근인지 허근인지 알 수 있다"
    }
   ],
   "misconception": "",
   "ack": "판별식이 무엇이고 뭘 알 수 있는지 잘 말했어!",
   "say": "판별식이 무엇이고 뭘 알 수 있는지 잘 말했어!",
   "parsed": true
  }
 },
 "a2": {
  "half": {
   "ms": 2431,
   "model": "gemini-3.6-flash",
   "verdict": "partial",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "양수면 실근이 두 개"
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    },
    {
     "id": "c",
     "hit": true,
     "evidence": "음수면 허근"
    }
   ],
   "misconception": "",
   "ack": "D가 양수와 음수일 때 근을 잘 맞춰줬어!",
   "say": "D가 양수와 음수일 때 근을 잘 맞춰줬어! D가 0이면 ±√D 가 0이 되지? 두 근은 어떻게 될까?",
   "parsed": true
  },
  "wrong": {
   "ms": 2027,
   "model": "gemini-3.6-flash",
   "verdict": "none",
   "hits": [
    {
     "id": "a",
     "hit": false,
     "evidence": ""
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    },
    {
     "id": "c",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "D가 0이면 근이 없다고 생각함",
   "ack": "그렇게 생각했구나.",
   "say": "그렇게 생각했구나. D가 양수면 √D 는 실수야. 그러면 ± 때문에 근이 어떻게 나올까?",
   "parsed": true
  },
  "full": {
   "ms": 2436,
   "model": "gemini-3.6-flash",
   "verdict": "pass",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "D>0 이면 서로 다른 두 실근"
    },
    {
     "id": "b",
     "hit": true,
     "evidence": "D=0 이면 중근(서로 같은 두 실근)"
    },
    {
     "id": "c",
     "hit": true,
     "evidence": "D<0 이면 서로 다른 두 허근"
    }
   ],
   "misconception": "",
   "ack": "판별식 조건에 따른 근을 아주 완벽하게 설명했어!",
   "say": "판별식 조건에 따른 근을 아주 완벽하게 설명했어!",
   "parsed": true
  }
 },
 "a3": {
  "half": {
   "ms": 2495,
   "model": "gemini-3.6-flash",
   "verdict": "partial",
   "hits": [
    {
     "id": "a",
     "hit": false,
     "evidence": ""
    },
    {
     "id": "b",
     "hit": true,
     "evidence": "서로 다른 두 실근은 D가 0보다 커요"
    }
   ],
   "misconception": "",
   "ack": "서로 다른 두 실근일 때 D>0이라고 잘 말했어!",
   "say": "서로 다른 두 실근일 때 D>0이라고 잘 말했어! 중근도 실근일까? 그렇다면 D=0 도 포함될까?",
   "parsed": true
  },
  "wrong": {
   "ms": 2066,
   "model": "gemini-3.6-flash",
   "verdict": "none",
   "hits": [
    {
     "id": "a",
     "hit": false,
     "evidence": ""
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "실근을 가질 때와 서로 다른 두 실근을 가질 때 모두 D>0이면 된다고 생각함",
   "ack": "그렇게 생각했구나.",
   "say": "그렇게 생각했구나. 중근도 실근일까? 그렇다면 D=0 도 포함될까?",
   "parsed": true
  },
  "full": {
   "ms": 2171,
   "model": "gemini-3.6-flash",
   "verdict": "pass",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "\"실근을 가진다\"는 중근도 포함하므로 D≥0"
    },
    {
     "id": "b",
     "hit": true,
     "evidence": "\"서로 다른 두 실근\"은 D>0"
    }
   ],
   "misconception": "",
   "ack": "실근 조건과 서로 다른 두 실근의 판별식을 정확히 구분했어!",
   "say": "실근 조건과 서로 다른 두 실근의 판별식을 정확히 구분했어!",
   "parsed": true
  }
 },
 "a4": {
  "half": {
   "ms": 2505,
   "model": "gemini-3.6-flash",
   "verdict": "partial",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "실수여야 해요"
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "",
   "ack": "계수가 실수여야 한다고 잘 찾아냈어!",
   "say": "계수가 실수여야 한다고 잘 찾아냈어! 계수에 i 같은 허수가 있으면, D가 양수여도 근이 실근이라고 장담할 수 있을까?",
   "parsed": true
  },
  "wrong": {
   "ms": 2271,
   "model": "gemini-3.6-flash",
   "verdict": "none",
   "hits": [
    {
     "id": "a",
     "hit": false,
     "evidence": ""
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "계수가 정수여야 한다고 생각함",
   "ack": "그렇게 생각할 수도 있구나.",
   "say": "그렇게 생각할 수도 있구나. 판별식 설명 앞에 늘 붙어 있던 \"계수가 ○○일 때\"라는 조건이 뭐였지?",
   "parsed": true
  },
  "full": {
   "ms": 2518,
   "model": "gemini-3.6-flash",
   "verdict": "pass",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "계수가 모두 실수여야 한다"
    },
    {
     "id": "b",
     "hit": true,
     "evidence": "계수에 허수가 있으면 D가 양수여도 허근이 나올 수 있어서 판별식을 쓸 수 없다"
    }
   ],
   "misconception": "",
   "ack": "계수가 실수여야 하는 이유까지 완벽하게 말해줬어!",
   "say": "계수가 실수여야 하는 이유까지 완벽하게 말해줬어!",
   "parsed": true
  }
 },
 "a5": {
  "half": {
   "ms": 2710,
   "model": "gemini-3.6-flash",
   "verdict": "partial",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "판별식이 0"
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "",
   "ack": "판별식이 0이 되어야 한다는 걸 잘 알고 있네!",
   "say": "판별식이 0이 되어야 한다는 걸 잘 알고 있네! 판별식에 계수를 넣으면 k가 들어 있는 식이 되지? 그다음엔 무엇을 하면 될까?",
   "parsed": true
  },
  "wrong": {
   "ms": 2079,
   "model": "gemini-3.6-flash",
   "verdict": "none",
   "hits": [
    {
     "id": "a",
     "hit": false,
     "evidence": ""
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "중근을 구하는 문제에서 근과 계수의 관계를 사용하려 함",
   "ack": "그렇게 생각했구나.",
   "say": "그렇게 생각했구나. 중근을 가질 때 판별식은 얼마였지?",
   "parsed": true
  },
  "full": {
   "ms": 5594,
   "model": "gemini-3.6-flash",
   "verdict": "pass",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "판별식을 0으로 놓는다"
    },
    {
     "id": "b",
     "hit": true,
     "evidence": "그 식을 k에 대한 방정식으로 풀어 k를 구한다"
    }
   ],
   "misconception": "",
   "ack": "판별식을 0으로 두고 k를 구한다고 잘 말했어!",
   "say": "판별식을 0으로 두고 k를 구한다고 잘 말했어!",
   "parsed": true
  }
 },
 "a6": {
  "half": {
   "ms": 2173,
   "model": "gemini-3.6-flash",
   "verdict": "partial",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "디가 0"
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "",
   "ack": "판별식이 0이 되어야 한다고 잘 말했어!",
   "say": "판별식이 0이 되어야 한다고 잘 말했어! (x+3)² 을 0으로 놓은 방정식의 근은 어떤 근이야?",
   "parsed": true
  },
  "wrong": {
   "ms": 1998,
   "model": "gemini-3.6-flash",
   "verdict": "none",
   "hits": [
    {
     "id": "a",
     "hit": false,
     "evidence": ""
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "판별식 D가 0보다 크면 완전제곱식이 된다고 생각함.",
   "ack": "아, 그렇게 생각했구나.",
   "say": "아, 그렇게 생각했구나. 완전제곱식이면 판별식이 양수, 0, 음수 중 무엇일까?",
   "parsed": true
  },
  "full": {
   "ms": 2758,
   "model": "gemini-3.6-flash",
   "verdict": "pass",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "판별식이 0이어야 한다"
    },
    {
     "id": "b",
     "hit": true,
     "evidence": "완전제곱식을 0으로 놓은 방정식은 중근을 가지기 때문이다"
    }
   ],
   "misconception": "",
   "ack": "판별식이 0인 이유와 중근의 관계를 정확하게 잘 설명했어!",
   "say": "판별식이 0인 이유와 중근의 관계를 정확하게 잘 설명했어!",
   "parsed": true
  }
 },
 "a7": {
  "half": {
   "ms": 2180,
   "model": "gemini-3.6-flash",
   "verdict": "partial",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "m이 1이면 안 돼요"
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "",
   "ack": "m이 1이 되면 안 된다고 잘 찾아냈어!",
   "say": "m이 1이 되면 안 된다고 잘 찾아냈어! x² 항이 없어진 방정식에도 판별식을 쓸 수 있을까?",
   "parsed": true
  },
  "wrong": {
   "ms": 2185,
   "model": "gemini-3.6-flash",
   "verdict": "none",
   "hits": [
    {
     "id": "a",
     "hit": false,
     "evidence": ""
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "",
   "ack": "좋아, 같이 하나씩 생각해 보자.",
   "say": "좋아, 같이 하나씩 생각해 보자. m에 1을 넣으면 x² 항은 어떻게 돼?",
   "parsed": true
  },
  "full": {
   "ms": 2564,
   "model": "gemini-3.6-flash",
   "verdict": "pass",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "x²의 계수가 0이 아니어야 한다(m≠1)"
    },
    {
     "id": "b",
     "hit": true,
     "evidence": "0이면 이차방정식이 아니어서 판별식을 쓸 수 없기 때문이다"
    }
   ],
   "misconception": "",
   "ack": "계수 조건과 이차방정식이 아니게 되는 이유까지 완벽해!",
   "say": "계수 조건과 이차방정식이 아니게 되는 이유까지 완벽해!",
   "parsed": true
  }
 },
 "b1": {
  "half": {
   "ms": 2817,
   "model": "gemini-3.6-flash",
   "verdict": "partial",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "합은 마이너스 에이 분의 비"
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "",
   "ack": "두 근의 합은 −b/a 라고 잘 찾아냈어!",
   "say": "두 근의 합은 −b/a 라고 잘 찾아냈어! 두 근 2와 3을 곱한 6은 어느 계수와 같을까?",
   "parsed": true
  },
  "wrong": {
   "ms": 2643,
   "model": "gemini-3.6-flash",
   "verdict": "partial",
   "hits": [
    {
     "id": "a",
     "hit": false,
     "evidence": ""
    },
    {
     "id": "b",
     "hit": true,
     "evidence": "곱은 에이 분의 씨"
    }
   ],
   "misconception": "두 근의 합을 마이너스를 빠뜨리고 b/a라고 생각함.",
   "ack": "두 근의 곱은 c/a라고 정확하게 잘 말해 줬어!",
   "say": "두 근의 곱은 c/a라고 정확하게 잘 말해 줬어! x²−5x+6=0 의 두 근 2와 3을 더하면 5야. 이건 x의 계수와 어떤 관계일까?",
   "parsed": true
  },
  "full": {
   "ms": 2664,
   "model": "gemini-3.6-flash",
   "verdict": "pass",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "두 근의 합은 −b/a"
    },
    {
     "id": "b",
     "hit": true,
     "evidence": "두 근의 곱은 c/a"
    }
   ],
   "misconception": "",
   "ack": "두 근의 합과 곱을 둘 다 정확하게 잘 말했어!",
   "say": "두 근의 합과 곱을 둘 다 정확하게 잘 말했어!",
   "parsed": true
  }
 },
 "b2": {
  "half": {
   "ms": 2155,
   "model": "gemini-3.6-flash",
   "verdict": "partial",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "더하면 루트가 플러스 마이너스라 없어져요"
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "",
   "ack": "더할 때 부호 때문에 루트가 사라진다고 잘 말했어!",
   "say": "더할 때 부호 때문에 루트가 사라진다고 잘 말했어! (p+q)(p−q) 꼴을 곱할 때 쓰는 공식은 뭐였지?",
   "parsed": true
  },
  "wrong": {
   "ms": 2086,
   "model": "gemini-3.6-flash",
   "verdict": "none",
   "hits": [
    {
     "id": "a",
     "hit": false,
     "evidence": ""
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "a로 나누기 때문에 루트가 사라진다고 생각함",
   "ack": "그렇게 생각했구나.",
   "say": "그렇게 생각했구나. 두 근은 루트 앞의 부호만 달라. 더하면 루트 부분은 어떻게 될까?",
   "parsed": true
  },
  "full": {
   "ms": 2403,
   "model": "gemini-3.6-flash",
   "verdict": "pass",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "더하면 +√D 와 −√D 가 서로 지워진다"
    },
    {
     "id": "b",
     "hit": true,
     "evidence": "곱하면 합차 공식으로 루트 부분이 제곱이 되어 없어진다"
    }
   ],
   "misconception": "",
   "ack": "더할 때와 곱할 때 루트가 사라지는 이유를 완벽하게 말했어!",
   "say": "더할 때와 곱할 때 루트가 사라지는 이유를 완벽하게 말했어!",
   "parsed": true
  }
 },
 "b3": {
  "half": {
   "ms": 1830,
   "model": "gemini-3.6-flash",
   "verdict": "none",
   "hits": [
    {
     "id": "a",
     "hit": false,
     "evidence": ""
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "",
   "ack": "좋아, 같이 하나씩 생각해 보자.",
   "say": "좋아, 같이 하나씩 생각해 보자. 근과 계수의 관계를 유도할 때 \"D가 양수\"라는 조건을 쓴 곳이 있었어?",
   "parsed": true
  },
  "wrong": {
   "ms": 2131,
   "model": "gemini-3.6-flash",
   "verdict": "none",
   "hits": [
    {
     "id": "a",
     "hit": false,
     "evidence": ""
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "허근일 때는 근과 계수의 관계를 쓸 수 없고 실근일 때만 쓸 수 있다고 생각함.",
   "ack": "아, 그렇게 생각했구나.",
   "say": "아, 그렇게 생각했구나. 근과 계수의 관계를 유도할 때 \"D가 양수\"라는 조건을 쓴 곳이 있었어?",
   "parsed": true
  },
  "full": {
   "ms": 2585,
   "model": "gemini-3.6-flash",
   "verdict": "pass",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "유도할 때 판별식이 양수라는 조건을 쓰지 않았다"
    },
    {
     "id": "b",
     "hit": true,
     "evidence": "√D 가 허수여도 더하면 지워지고 곱하면 루트가 없어지는 건 똑같다"
    }
   ],
   "misconception": "",
   "ack": "유도 과정과 루트 D의 성질까지 완벽하게 설명했네!",
   "say": "유도 과정과 루트 D의 성질까지 완벽하게 설명했네!",
   "parsed": true
  }
 },
 "b4": {
  "half": {
   "ms": 1967,
   "model": "gemini-3.6-flash",
   "verdict": "partial",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "근과 계수의 관계로 합이랑 곱을 구해요"
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "",
   "ack": "근과 계수의 관계로 합과 곱을 구한다고 잘 말했어!",
   "say": "근과 계수의 관계로 합과 곱을 구한다고 잘 말했어! (α+β)² 을 전개하면 α²+β² 말고 무엇이 더 나와?",
   "parsed": true
  },
  "wrong": {
   "ms": 2505,
   "model": "gemini-3.6-flash",
   "verdict": "none",
   "hits": [
    {
     "id": "a",
     "hit": false,
     "evidence": ""
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "직접 근을 구해서 제곱해 더한다고 생각함.",
   "ack": "근의 공식을 떠올려 주었구나.",
   "say": "근의 공식을 떠올려 주었구나. 근을 구하지 않고도 계수에서 바로 알 수 있는 두 값이 뭐였지?",
   "parsed": true
  },
  "full": {
   "ms": 2774,
   "model": "gemini-3.6-flash",
   "verdict": "pass",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "근과 계수의 관계로 두 근의 합과 곱을 구한다"
    },
    {
     "id": "b",
     "hit": true,
     "evidence": "곱셈 공식의 변형으로 α²+β² 을 합과 곱으로 바꿔 계산한다"
    }
   ],
   "misconception": "",
   "ack": "근과 계수의 관계와 곱셈 공식 변형을 아주 완벽하게 설명했어!",
   "say": "근과 계수의 관계와 곱셈 공식 변형을 아주 완벽하게 설명했어!",
   "parsed": true
  }
 },
 "b5": {
  "half": {
   "ms": 2399,
   "model": "gemini-3.6-flash",
   "verdict": "partial",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "알파랑 이 알파로 놓아요"
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "",
   "ack": "두 근을 알파와 2알파로 멋지게 잘 두었어!",
   "say": "두 근을 알파와 2알파로 멋지게 잘 두었어! 두 근을 문자로 놓았으면, 근과 계수의 관계로 어떤 식 두 개를 세울 수 있을까?",
   "parsed": true
  },
  "wrong": {
   "ms": 2883,
   "model": "gemini-3.6-flash",
   "verdict": "none",
   "hits": [
    {
     "id": "a",
     "hit": false,
     "evidence": ""
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "근의 공식을 사용해 두 근을 구한 뒤 비를 맞추려고 함.",
   "ack": "좋아, 같이 하나씩 생각해 보자.",
   "say": "좋아, 같이 하나씩 생각해 보자. 비가 1:2 인 두 수를 문자 하나로 쓰면 어떻게 될까?",
   "parsed": true
  },
  "full": {
   "ms": 2034,
   "model": "gemini-3.6-flash",
   "verdict": "pass",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "두 근을 α, 2α 처럼 문자 하나로 놓는다"
    },
    {
     "id": "b",
     "hit": true,
     "evidence": "두 근의 합과 곱으로 식을 세워 α와 k를 구한다"
    }
   ],
   "misconception": "",
   "ack": "두 근을 알파와 이알파로 두고 합과 곱을 쓴다고 잘 말했어!",
   "say": "두 근을 알파와 이알파로 두고 합과 곱을 쓴다고 잘 말했어!",
   "parsed": true
  }
 },
 "b6": {
  "half": {
   "ms": 2118,
   "model": "gemini-3.6-flash",
   "verdict": "partial",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "합이랑 곱"
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "",
   "ack": "두 근의 합과 곱을 알아야 한다고 잘 말해줬어!",
   "say": "두 근의 합과 곱을 알아야 한다고 잘 말해줬어! (x−α)(x−β)=0 을 전개하면 x의 계수와 상수항 자리에 무엇이 와?",
   "parsed": true
  },
  "wrong": {
   "ms": 2729,
   "model": "gemini-3.6-flash",
   "verdict": "none",
   "hits": [
    {
     "id": "a",
     "hit": false,
     "evidence": ""
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "두 근을 곱한 값만 알면 이차방정식을 만들 수 있다고 생각함",
   "ack": "그렇게 생각했구나.",
   "say": "그렇게 생각했구나. 근과 계수의 관계에서 두 근으로 계산했던 두 값이 뭐였지?",
   "parsed": true
  },
  "full": {
   "ms": 2501,
   "model": "gemini-3.6-flash",
   "verdict": "pass",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "두 근의 합과 곱을 알면 된다"
    },
    {
     "id": "b",
     "hit": true,
     "evidence": "x²−(두 근의 합)x+(두 근의 곱)=0 꼴이 된다"
    }
   ],
   "misconception": "",
   "ack": "두 근의 합과 곱으로 식을 만드는 모양까지 완벽하게 말했어!",
   "say": "두 근의 합과 곱으로 식을 만드는 모양까지 완벽하게 말했어!",
   "parsed": true
  }
 },
 "c1": {
  "half": {
   "ms": 2455,
   "model": "gemini-3.6-flash",
   "verdict": "partial",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "두 변이 같은 삼각형"
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "",
   "ack": "두 변의 길이가 같다는 걸 잘 말했어!",
   "say": "두 변의 길이가 같다는 걸 잘 말했어! 길이가 같은 두 변이 만나는 꼭짓점의 각을 뭐라고 불러?",
   "parsed": true
  },
  "wrong": {
   "ms": 2055,
   "model": "gemini-3.6-flash",
   "verdict": "none",
   "hits": [
    {
     "id": "a",
     "hit": false,
     "evidence": ""
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "학생은 이등변삼각형을 세 변의 길이가 모두 같은 삼각형(정삼각형)으로 오해함",
   "ack": "그렇게 생각했구나.",
   "say": "그렇게 생각했구나. 이름의 \"등변\"은 무엇이 같다는 뜻일까?",
   "parsed": true
  },
  "full": {
   "ms": 2738,
   "model": "gemini-3.6-flash",
   "verdict": "pass",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "두 변의 길이가 같은 삼각형이다"
    },
    {
     "id": "b",
     "hit": true,
     "evidence": "길이가 같은 두 변 사이의 각이 꼭지각, 나머지 두 각이 밑각이다"
    }
   ],
   "misconception": "",
   "ack": "이등변삼각형의 뜻과 꼭지각, 밑각 위치를 잘 설명했어!",
   "say": "이등변삼각형의 뜻과 꼭지각, 밑각 위치를 잘 설명했어!",
   "parsed": true
  }
 },
 "c2": {
  "half": {
   "ms": 1808,
   "model": "gemini-3.6-flash",
   "verdict": "partial",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "밑각이 같아요"
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "",
   "ack": "두 밑각의 크기가 같다고 잘 말했어!",
   "say": "두 밑각의 크기가 같다고 잘 말했어! 꼭지각을 반으로 나누는 선은 밑변을 어떻게 나눌까?",
   "parsed": true
  },
  "wrong": {
   "ms": 2630,
   "model": "gemini-3.6-flash",
   "verdict": "none",
   "hits": [
    {
     "id": "a",
     "hit": false,
     "evidence": ""
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "이등변삼각형을 세 각의 크기가 모두 같은 삼각형으로 생각함",
   "ack": "그렇게 생각했구나.",
   "say": "그렇게 생각했구나. 꼭지각 말고 나머지 두 각의 크기는 서로 어때?",
   "parsed": true
  },
  "full": {
   "ms": 2128,
   "model": "gemini-3.6-flash",
   "verdict": "pass",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "두 밑각의 크기가 같다"
    },
    {
     "id": "b",
     "hit": true,
     "evidence": "꼭지각의 이등분선은 밑변을 수직이등분한다"
    }
   ],
   "misconception": "",
   "ack": "이등변삼각형의 성질 두 가지를 모두 잘 말했어!",
   "say": "이등변삼각형의 성질 두 가지를 모두 잘 말했어!",
   "parsed": true
  }
 },
 "c3": {
  "half": {
   "ms": 2125,
   "model": "gemini-3.6-flash",
   "verdict": "none",
   "hits": [
    {
     "id": "a",
     "hit": false,
     "evidence": ""
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "",
   "ack": "좋아, 같이 하나씩 생각해 보자.",
   "say": "좋아, 같이 하나씩 생각해 보자. 삼각형을 두 개로 나누려면 꼭짓점 A에서 어떤 선을 그으면 좋을까?",
   "parsed": true
  },
  "wrong": {
   "ms": 2253,
   "model": "gemini-3.6-flash",
   "verdict": "none",
   "hits": [
    {
     "id": "a",
     "hit": false,
     "evidence": ""
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "밑변에 수선을 그어 길이를 재서 증명한다고 생각함.",
   "ack": "그렇게 생각할 수도 있구나!",
   "say": "그렇게 생각할 수도 있구나! 삼각형을 두 개로 나누려면 꼭짓점 A에서 어떤 선을 그으면 좋을까?",
   "parsed": true
  },
  "full": {
   "ms": 2153,
   "model": "gemini-3.6-flash",
   "verdict": "pass",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "꼭지각의 이등분선을 긋는다"
    },
    {
     "id": "b",
     "hit": true,
     "evidence": "나뉜 두 삼각형이 SAS 합동임을 보인다"
    }
   ],
   "misconception": "",
   "ack": "이등분선과 SAS 합동을 완벽하게 잘 말했어!",
   "say": "이등분선과 SAS 합동을 완벽하게 잘 말했어!",
   "parsed": true
  }
 },
 "c4": {
  "half": {
   "ms": 2046,
   "model": "gemini-3.6-flash",
   "verdict": "partial",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "SSS 합동"
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "",
   "ack": "SSS 합동이라고 잘 말해 줬어!",
   "say": "SSS 합동이라고 잘 말해 줬어! M이 중점이면 어떤 두 선분의 길이가 같아?",
   "parsed": true
  },
  "wrong": {
   "ms": 2321,
   "model": "gemini-3.6-flash",
   "verdict": "none",
   "hits": [
    {
     "id": "a",
     "hit": false,
     "evidence": ""
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "꼭짓점 A와 밑변의 중점을 이었을 때 SAS 합동을 사용하고 각이 반으로 나뉜다고 생각함.",
   "ack": "아 그렇게 생각했구나.",
   "say": "아 그렇게 생각했구나. 중점과 이은 선은 꼭지각을 반으로 나눈다고 장담할 수 없어. 그럼 두 삼각형에서 확실히 같은 것은 각이야, 변이야?",
   "parsed": true
  },
  "full": {
   "ms": 2186,
   "model": "gemini-3.6-flash",
   "verdict": "pass",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "SSS 합동을 쓴다"
    },
    {
     "id": "b",
     "hit": true,
     "evidence": "AB=AC, BM=CM, AM 공통"
    }
   ],
   "misconception": "",
   "ack": "SSS 합동 조건과 세 변이 같은 이유를 잘 말했어!",
   "say": "SSS 합동 조건과 세 변이 같은 이유를 잘 말했어!",
   "parsed": true
  }
 },
 "c5": {
  "half": {
   "ms": 1860,
   "model": "gemini-3.6-flash",
   "verdict": "none",
   "hits": [
    {
     "id": "a",
     "hit": false,
     "evidence": ""
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "",
   "ack": "좋아, 같이 하나씩 생각해 보자.",
   "say": "좋아, 같이 하나씩 생각해 보자. △ABD 와 △ACD 가 합동이면 점 D에서 생긴 두 각은 서로 어때?",
   "parsed": true
  },
  "wrong": {
   "ms": 1979,
   "model": "gemini-3.6-flash",
   "verdict": "none",
   "hits": [
    {
     "id": "a",
     "hit": false,
     "evidence": ""
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "이등분선과 밑변이 만나는 각이 원래부터 직각이라고 생각함.",
   "ack": "그렇게 생각했구나.",
   "say": "그렇게 생각했구나. △ABD 와 △ACD 가 합동이면 점 D에서 생긴 두 각은 서로 어때?",
   "parsed": true
  },
  "full": {
   "ms": 2303,
   "model": "gemini-3.6-flash",
   "verdict": "pass",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "합동인 두 삼각형에서 이등분선과 밑변이 만드는 두 각이 같다"
    },
    {
     "id": "b",
     "hit": true,
     "evidence": "그 두 각의 합이 180°라서 각각 90°다"
    }
   ],
   "misconception": "",
   "ack": "두 각이 같고 합이 180°라 90°가 되는 이유를 잘 설명했어!",
   "say": "두 각이 같고 합이 180°라 90°가 되는 이유를 잘 설명했어!",
   "parsed": true
  }
 },
 "c6": {
  "half": {
   "ms": 1945,
   "model": "gemini-3.6-flash",
   "verdict": "partial",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "ASA 합동"
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "",
   "ack": "ASA 합동으로 바뀐다고 잘 말해줬어!",
   "say": "ASA 합동으로 바뀐다고 잘 말해줬어! 이번 증명에서 AB=AC 는 처음부터 주어진 거야, 증명해야 할 거야?",
   "parsed": true
  },
  "wrong": {
   "ms": 2064,
   "model": "gemini-3.6-flash",
   "verdict": "none",
   "hits": [
    {
     "id": "a",
     "hit": false,
     "evidence": ""
    },
    {
     "id": "b",
     "hit": false,
     "evidence": ""
    }
   ],
   "misconception": "증명할 때 똑같이 SAS 합동을 쓴다고 생각함",
   "ack": "아, 그렇게 생각했구나.",
   "say": "아, 그렇게 생각했구나. 이번에 같은 것을 찾으면 변이 많아, 각이 많아?",
   "parsed": true
  },
  "full": {
   "ms": 2385,
   "model": "gemini-3.6-flash",
   "verdict": "pass",
   "hits": [
    {
     "id": "a",
     "hit": true,
     "evidence": "SAS 대신 ASA 합동을 쓴다"
    },
    {
     "id": "b",
     "hit": true,
     "evidence": "AB=AC 는 증명해야 할 결론이라 근거로 쓸 수 없기 때문이다"
    }
   ],
   "misconception": "",
   "ack": "합동 조건이 바뀐 이유를 완벽하게 잘 설명했어!",
   "say": "합동 조건이 바뀐 이유를 완벽하게 잘 설명했어!",
   "parsed": true
  }
 }
};
