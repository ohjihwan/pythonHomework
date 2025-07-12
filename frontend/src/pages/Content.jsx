import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '@/assets/js/apiClient';

function Content() {
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const token = sessionStorage.getItem('token');
		if (!token) {
			alert("로그인이 필요합니다.");
			navigate('/login');
			return;
		}

		fetch('/api/protected', {
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(res => res.json())
		.then(data => {
			if (data.status === 'success') {
				setMessage(data.message);
			} else {
				setMessage("인증 실패: " + (data.message || "알 수 없는 오류"));
			}
		})
		.catch(err => {
			console.error("인증 요청 실패:", err);
			setMessage("인증 실패: 네트워크 오류");
		});
	}, []);

	const handleLogout = () => {
		sessionStorage.removeItem('token');
		alert("로그아웃 되었습니다.");
		navigate('/login');
	};

	useEffect(() => {
		if (window.Prism) {
			window.Prism.highlightAll();
		}
	}, []);

	return (
		<div className="content">
			<div className="content__top">
				<h1 className="content__title">{message}</h1>
				<button className="content__logout" onClick={handleLogout}>로그아웃</button>
			</div>
			<div className="content__middle">
				<hr />
				<h2>📘 1. 자료구조 개념 및 파이썬 예제</h2>
				
				<section>
					<h3>📌 1. 배열 (Array)</h3>
					<p>파이썬에서 배열은 `array` 모듈을 통해 생성하며, 동일한 자료형만 저장할 수 있는 구조입니다. 리스트는 다양한 자료형을 담을 수 있어 유연하지만, 그만큼 타입 안정성은 떨어집니다. 반면 array 모듈을 활용하면 고정 타입 배열로 메모리 절약과 연산 최적화가 가능해집니다.</p>
<pre><code className="language-python">
{`import array as arr

mylist = [1, 2, 3] 
print(type(mylist))
>>> <class 'list'>

mylist.append('4') 
print(mylist)
>>> [1, 2, 3, '4']  # 문자열이 섞여 들어감

mylist.insert(1, 5) 
print(mylist)
>>> [1, 5, 2, 3, '4']

myarray = arr.array('i', [1, 2, 3]) 
print(type(myarray))
>>> <class 'array.array'>

# myarray.append('4')   # 문자열은 허용하지 않음 → 오류 발생
print(myarray)
>>> array('i', [1, 2, 3])

myarray.insert(1, 5)    # 정수는 insert 가능
print(myarray)
>>> array('i', [1, 5, 2, 3])`}
</code></pre>
					<p className="content__source">출처: <Link to="https://velog.io/@nochesita/Fund-08.-%EB%B0%B0%EC%97%B4-array" className="go-source" target="_blank" rel="noopener noreferrer">https://velog.io/@nochesita/Fund-08.-배열-array</Link></p>
				</section>


				<section>
					<h3>📌 2. 큐 (Queue)</h3>
					<p>
						큐는 한쪽 끝에서는 데이터를 추가하고 다른 한쪽에서는 데이터를 제거하는 <strong>선입선출(FIFO, First In First Out)</strong> 자료구조입니다.
						파이썬에서는 <code>collections.deque</code> 모듈을 사용하여 큐를 효율적으로 구현할 수 있습니다. 리스트를 이용한 큐보다 성능 면에서도 우수합니다.
					</p>
<pre><code className="language-python">
{`from collections import deque
queue = deque([1, 2, 3])
print(queue)
>>> deque([1, 2, 3])

queue.append(4)   # enqueue
print(queue)
>>> deque([1, 2, 3, 4])

element = queue.popleft()  # dequeue
print(element)
>>> 1
print(queue)
>>> deque([2, 3, 4])`}
</code></pre>
					<p className="content__source">
						출처: <Link to="https://hyang2data.tistory.com/114" className="go-source" target="_blank" rel="noopener noreferrer">https://hyang2data.tistory.com/114 - [python] deque란? deque 이해하고 사용하기</Link>
					</p>
				</section>

				<section>
					<h3>📌 3. 스택 (Stack)</h3>
					<p>
						스택은 **LIFO (Last-In, First-Out)** 구조를 따르는 자료구조로,  
						나중에 넣은 데이터를 먼저 꺼냅니다. 파이썬에서는 리스트의 `append()`와 `pop()`만으로 손쉽게 구현할 수 있어요.
					</p>
<pre><code className="language-python">
{`# 리스트로 스택 구현
stack = []
print(stack)
>>> []

stack.append(1)
stack.append(2)
stack.append(3)
print(stack)
>>> [1, 2, 3]

top = stack.pop()  # 마지막 요소 꺼내기
print(top)
>>> 3
print(stack)
>>> [1, 2]`}
</code></pre>
					<p className="content__source">
						출처: <Link to="https://gorokke.tistory.com/129" className="go-source" target="_blank" rel="noopener noreferrer">https://gorokke.tistory.com/129 - [자료구조] 파이썬 스택(stack) 총정리 </Link>
					</p>
				</section>

				<section>
					<h3>📌 4-1. 링크드리스트 (Linked List)</h3>
					<p>
						연결 리스트는 데이터를 담은 노드들이 포인터로 한 줄로 이어져 있는 구조입니다.
						배열과 달리 연속 메모리를 사용하지 않아, <strong>삽입/삭제가 편하고 유연하다</strong>는 장점이 있어요.
					</p>
<pre><code className="language-python">
{`# 단일 연결 리스트(Singly Linked List) 구현
class Node:
	def __init__(self, data):
		self.data = data
		self.next = None

class LinkedList:
	def __init__(self):
		self.head = None

	def append(self, data):
		new_node = Node(data)
		if not self.head:
			self.head = new_node
			return
		cur = self.head
		while cur.next:
			cur = cur.next
		cur.next = new_node

	def display(self):
		cur = self.head
		while cur:
			print(cur.data, end=" -> ")
			cur = cur.next
		print("None")

# 사용 예
ll = LinkedList()
ll.append(1)
ll.append(2)
ll.append(3)
ll.display()
>>> 1 -> 2 -> 3 -> None`}
</code></pre>
					<p className="content__source">
						출처: <Link to="https://hyeinisfree.tistory.com/70" className="go-source" target="_blank" rel="noopener noreferrer">
						https://hyeinisfree.tistory.com/70 - [Python] 연결 리스트(Linked List) 구현하기</Link>
					</p>
				</section>

				<section>
					<h3>📌 4-2. 더블 링크드리스트 (Doubly Linked List)</h3>
					<p>
						더블 링크드리스트는 각 노드가 <strong>이전(prev)</strong>과 <strong>다음(next)</strong> 포인터를 모두 가지고 있는 연결 리스트입니다.
						단일 링크드리스트에 비해 양방향 이동이 가능해, 노드 삽입 및 삭제에 더 유리한 자료구조입니다.
					</p>
<pre><code className="language-python">{`# 더블 링크드리스트 구현 예시
class Node:
	def __init__(self, data):
		self.data = data
		self.prev = None
		self.next = None

class DoublyLinkedList:
	def __init__(self):
		self.head = None

	def append(self, data):
		new_node = Node(data)
		if not self.head:
			self.head = new_node
			return
		cur = self.head
		while cur.next:
			cur = cur.next
		cur.next = new_node
		new_node.prev = cur

	def print_forward(self):
		cur = self.head
		while cur:
			print(cur.data, end=" <-> ")
			cur = cur.next
		print("None")

	def print_backward(self):
		cur = self.head
		while cur and cur.next:
			cur = cur.next
		while cur:
			print(cur.data, end=" <-> ")
			cur = cur.prev
		print("None")

# 사용 예
dll = DoublyLinkedList()
dll.append(1)
dll.append(2)
dll.append(3)
dll.print_forward()
>>> 1 <-> 2 <-> 3 <-> None
dll.print_backward()
>>> 3 <-> 2 <-> 1 <-> None`}</code></pre>
					<p className="content__source">
						출처: <Link to="https://daimhada.tistory.com/99" className="go-source" target="_blank" rel="noopener noreferrer">
							https://daimhada.tistory.com/99 - Python으로 구현하는 자료구조 : Linked List (2) Doubly linked list
						</Link>
					</p>
				</section>

				<section>
					<h3>📌 5. 해시 테이블 (Hash Table)</h3>
					<p>
						해시 테이블은 <strong>키(Key)</strong>를 해시 함수를 통해 고유한 인덱스로 변환하여 값을 저장하는 자료구조입니다.
						파이썬에서는 <code>dict</code> 타입이 해시 테이블 기반으로 동작하며, 평균적으로 <strong>삽입, 삭제, 검색이 O(1)</strong>의 시간복잡도를 가집니다.
					</p>
<pre><code className="language-python">{`# 해시 테이블 직접 구현 예시 (Chaining 방식)
class HashTable:
    def __init__(self, size=8):
        self.size = size
        self.table = [[] for _ in range(size)]

    def _hash(self, key):
        return hash(key) % self.size

    def insert(self, key, value):
        idx = self._hash(key)
        for pair in self.table[idx]:
            if pair[0] == key:
                pair[1] = value
                return
        self.table[idx].append([key, value])

    def search(self, key):
        idx = self._hash(key)
        for k, v in self.table[idx]:
            if k == key:
                return v
        return None

# 사용 예
ht = HashTable()
ht.insert("apple", 3)
ht.insert("banana", 5)
print(ht.search("apple"))
>>> # 3
print(ht.search("banana"))
>>> # 5`}</code></pre>
					<p className="content__source">
						출처: <Link to="https://doing7.tistory.com/62" className="go-source" target="_blank" rel="noopener noreferrer">
							https://doing7.tistory.com/62 - [자료구조] 해쉬 테이블 with Python
						</Link>
					</p>
				</section>

				<section>
					<h3>📌 6. 트리 (Tree)</h3>
					<p>
						트리는 **계층 구조**를 표현하는 비선형 자료구조에요.  
						노드와 간선으로 이루어지고, 가장 위에 위치한 노드를 루트(root)라고 부르며,  
						각 노드는 최대 두 개의 자식(left, right)을 가지는 **이진 트리(Binary Tree)** 형태가 일반적입니다.
					</p>
<pre><code className="language-python">{`# 간단한 이진 탐색 트리(Binary Search Tree) 구현
class Node:
	def __init__(self, value=None, left=None, right=None):
		self.value = value
		self.left = left
		self.right = right

class Tree:
	def __init__(self):
		self.root = None

	def push(self, value):
		node = Node(value=value)
		if not self.root:
			self.root = node
			return
		cur = self.root
		while True:
			if value < cur.value:
				if cur.left:
					cur = cur.left
				else:
					cur.left = node
					break
			else:
				if cur.right:
					cur = cur.right
				else:
					cur.right = node
					break

	def inorder(self, node):
		if node:
			self.inorder(node.left)
			print(node.value)
			self.inorder(node.right)

# 사용 예
bt = Tree()
bt.push(44)
bt.push(22)
bt.push(66)
bt.push(11)
bt.push(33)
bt.inorder(bt.root)
>>> 11
>>> 22
>>> 33
>>> 44
>>> 66`}
</code></pre>
					<p className="content__source">
						출처: <Link to="https://hazarddev.tistory.com/65" className="go-source" target="_blank" rel="noopener noreferrer">
						https://hazarddev.tistory.com/65 - [Python 자료구조] 트리자료구조 구현 (Implemented Tree Structure)</Link>
					</p>
				</section>

				<section>
					<h3>📌 7. 힙 (Heap)</h3>
					<p>
						힙은 **완전 이진 트리** 형태를 기반으로, 최댓값 또는 최솟값을  
						빠르게 찾아내기 위해 고안된 자료구조입니다.  
						특히 **우선순위 큐(Priority Queue)** 구현에 아주 적합해요.
					</p>
<pre><code className="language-python">{`# 최소 힙(min-heap) 구현 예시 - 파이썬 리스트 기반

import heapq

heap = []
heapq.heappush(heap, 4)
heapq.heappush(heap, 2)
heapq.heappush(heap, 8)
heapq.heappush(heap, 1)

print(heap)
>>> [1, 2, 8, 4]  # heap 구조 유지

min_val = heapq.heappop(heap)
print(min_val)
>>> 1
print(heap)
>>> [2, 4, 8]`}</code></pre>
					<p className="content__source">
						출처: <Link to="https://daimhada.tistory.com/108" className="go-source" target="_blank" rel="noopener noreferrer">
						https://daimhada.tistory.com/108 - Python으로 구현하는 자료구조 : Heap</Link>
					</p>
				</section>

				<h2>📘 2. 알고리즘 개념 및 파이썬 예제</h2>

				<section>
					<h3>📌 1. 정렬 알고리즘 (Sorting Algorithms)</h3>
					<p>
						정렬 알고리즘은 데이터를 특정 기준에 따라 순서대로 정리하는 방법입니다.  
						여기서는 가장 기초적이면서 핵심적인 **버블 정렬**, **선택 정렬**, **삽입 정렬**을 함께 살펴볼게요.
					</p>

<pre><code className="language-python">{`# 버블 정렬 (Bubble Sort)
def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

print(bubble_sort([5, 3, 8, 4, 2]))
>>> [2, 3, 4, 5, 8]`}</code></pre>

<pre><code className="language-python">{`# 선택 정렬 (Selection Sort)
def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

print(selection_sort([5, 3, 8, 4, 2]))
>>> [2, 3, 4, 5, 8]`}</code></pre>

<pre><code className="language-python">{`# 삽입 정렬 (Insertion Sort)
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

print(insertion_sort([5, 3, 8, 4, 2]))
>>> [2, 3, 4, 5, 8]`}</code></pre>

					<p className="content__source">
						출처 : <Link to="https://eye-eye.tistory.com/3" className="go-source" target="_blank" rel="noopener noreferrer">버블/선택/삽입 정렬 - eye-eye.tistory.com/3 - Python 기본 정렬 알고리즘</Link>
					</p>
				</section>

				<section className="content__section">
					<h3>📌 2. 재귀 호출 (Recursion) 및 깊이 제한 (약 1천번)</h3>
					<p>
						재귀 호출은 <strong>함수가 자기 자신을 호출하는 방식</strong>으로,
						코드가 간결하고 논리 흐름이 직관적이라 팩토리얼, DFS, 백트래킹 같은 알고리즘에서 자주 사용됩니다.
						<br />
						파이썬에서는 기본적으로 <strong>최대 1000번까지 재귀 호출을 허용</strong>하고,
						초과 시 <code>RecursionError</code>가 발생합니다.
					</p>

<pre><code className="language-python">{`# 예시: 팩토리얼 함수
def factorial(n):
    if n <= 1:       # 기저 조건 (base case)
        return 1
    return n * factorial(n - 1)

print(factorial(5))
>>> 120`}</code></pre>

<pre><code className="language-python">{`# 최대 재귀 깊이 확인
import sys
print(sys.getrecursionlimit())
>>> # 기본 제한: 1000

# 재귀 깊이 초과 예시
def go_deep(n):
    if n <= 0:
        return
    go_deep(n - 1)

# go_deep(1100)  # -> RecursionError 발생 가능`}</code></pre>

<pre><code className="language-python">{`# 재귀 깊이 제한 변경
import sys
sys.setrecursionlimit(2000)
print(sys.getrecursionlimit())
>>> 2000 # 변경 확인: 2000`}</code></pre>

					<p className="content__source">
						출처: <Link to="https://yeachan.tistory.com/98" className="go-source" target="_blank" rel="noopener noreferrer">yeachan.tistory.com/98 - [알고리즘] 재귀 함수 (Recursive Function)</Link>
					</p>
				</section>


				<section className="content__section">
					<h3>📌 3. 시간 복잡도 & 공간 복잡도 (Big-O 표기법)</h3>
					<p>
						알고리즘의 성능을 평가하는 기준은 <strong>시간 복잡도(Time Complexity)</strong>와 
						<strong>공간 복잡도(Space Complexity)</strong>입니다.
						이는 문제의 입력 크기(<code>n</code>)에 따라 소요 시간이나 메모리 사용량이 어떻게 증가하는지를 나타내며,
						<strong>Big-O 표기법</strong>을 사용해 나타냅니다.
					</p>

					<ul>
						<li><strong>O(1)</strong>: 입력 크기와 무관한 상수 시간</li>
						<li><strong>O(log n)</strong>: 이진 탐색처럼 입력 크기를 절반으로 줄이는 알고리즘</li>
						<li><strong>O(n)</strong>: 입력 크기에 비례한 시간</li>
						<li><strong>O(n log n)</strong>: 대부분의 효율적인 정렬 알고리즘</li>
						<li><strong>O(n²)</strong>: 이중 반복문 (ex. 버블 정렬)</li>
					</ul>

<pre><code className="language-python">{`# 시간 복잡도 O(n): 선형 탐색 예시
def linear_search(arr, target):
	for i in range(len(arr)):
		if arr[i] == target:
			return i
	return -1`}</code></pre>

<pre><code className="language-python">{`# 공간 복잡도 예시: 리스트 복사
def duplicate_list(lst):
	new_lst = lst[:]  # 새로운 메모리 사용
	return new_lst

# 공간 복잡도: O(n)`}</code></pre>

					<p className="content__source">
						출처: ChatGPT (GPT-4), OpenAI
					</p>
				</section>

				<section className="content__section">
					<h3>📌 4. 동적 프로그래밍 (Dynamic Programming)</h3>
					<p>
						동적 프로그래밍(DP)은 큰 문제를 <strong>작은 하위 문제</strong>로 나누고,
						중복되는 하위 문제를 <strong>한 번만 계산한 뒤 저장</strong>해서
						시간 복잡도를 획기적으로 줄이는 알고리즘 기법입니다.
					</p>

<pre><code className="language-python">{`# 탑다운 (메모이제이션) 예제 - baby-dev 블로그 기반
memo = {}
def fib(n):
    if n <= 1:
        return n
    if n in memo:
        return memo[n]
    memo[n] = fib(n - 1) + fib(n - 2)
    return memo[n]

print(fib(10))
>>> 55`}</code></pre>

<pre><code className="language-python">{`# 바텀업 (반복문 기반 테이블화)
def fib_bottom_up(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[0], dp[1] = 0, 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]

print(fib_bottom_up(10))
>>> 55`}</code></pre>

					<p className="content__source">
						출처: <Link to="https://baby-dev.tistory.com/entry/Python%EC%9D%B4%EC%BD%94%ED%85%8C-%EB%8B%A4%EC%9D%B4%EB%82%98%EB%AF%B9-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8DDP" target="_blank" rel="noopener noreferrer" className="go-source">baby-dev.tistory.com/entry/Python이코테-다이나믹-프로그래밍-DP</Link>
					</p>
				</section>

				<section className="content__section">
					<h3>📌 5. 탐색 (Search)</h3>
					<p>
						탐색이란 데이터에서 특정 값을 찾는 과정을 뜻합니다.  
						대표적으로는 **순차 탐색(Linear Search)**, **이진 탐색(Binary Search)**,  
						**깊이 우선 탐색(DFS)**, **너비 우선 탐색(BFS)**이 있습니다.
					</p>

					<h4>1. 순차 탐색 (Sequential Search)</h4>
<pre><code className="language-python">{`def sequential_search(arr, target):
    for i, v in enumerate(arr):
        if v == target:
            return i
    return -1

print(sequential_search([5,3,8,4,2], 4))
>>> 3`}</code></pre>

					<h4>2. 이진 탐색 (Binary Search)</h4>
<pre><code className="language-python">{`def binary_search(arr, target):
    left, right = 0, len(arr)-1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

print(binary_search([2,3,4,5,8], 5))
>>> 3`}</code></pre>

  					<h4>3. 깊이 우선 탐색 (DFS)</h4>
<pre><code className="language-python">{`def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    print(start, end=' ')
    for nxt in graph[start]:
        if nxt not in visited:
            dfs(graph, nxt, visited)

graph = {
    'A': ['B','C'],
    'B': ['A','D','E'],
    'C': ['A','F'],
    'D': [],
    'E': ['F'],
    'F': []
}
dfs(graph, 'A')
>>> A B D E F C`}</code></pre>

  					<h4>4. 너비 우선 탐색 (BFS)</h4>
<pre><code className="language-python">{`from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    while queue:
        v = queue.popleft()
        print(v, end=' ')
        for nxt in graph[v]:
            if nxt not in visited:
                visited.add(nxt)
                queue.append(nxt)

bfs(graph, 'A')
>>> A B C D E F`}</code></pre>

					<p className="content__source">
						출처: <Link to="https://nyambu.co.kr/30" className="go-source" target="_blank" rel="noopener noreferrer">nyambu.co.kr - 탐색 알고리즘 개념 (이진 탐색, DFS, BFS) - 2025-03-16</Link>
					</p>
				</section>

				<section className="content__section">
					<h3>📌 6. 그래프 탐색 (Graph Traversal)</h3>
					<p>
						그래프란 노드(Node)와 그 노드들 사이의 간선(Edge)으로 표현되는 비선형 자료구조입니다.  
						이 구조에서 주로 사용하는 탐색 방식은 **깊이 우선 탐색(DFS)**와 **너비 우선 탐색(BFS)**입니다.
					</p>

  					<h4>🔹 깊이 우선 탐색 (DFS)</h4>
<pre><code className="language-python">{`def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    print(start, end=' ')
    for nxt in graph[start]:
        if nxt not in visited:
            dfs(graph, nxt, visited)

graph = {
    'A': ['B','C'],
    'B': ['A','D','E'],
    'C': ['A','F'],
    'D': [], 'E': ['F'], 'F': []
}
dfs(graph, 'A')
>>> A B D E F C`}</code></pre>

					<h4>🔹 너비 우선 탐색 (BFS)</h4>
<pre><code className="language-python">{`from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    while queue:
        v = queue.popleft()
        print(v, end=' ')
        for nxt in graph[v]:
            if nxt not in visited:
                visited.add(nxt)
                queue.append(nxt)

bfs(graph, 'A')
>>> A B C D E F`}</code></pre>

					<p className="content__source">
						출처: <Link to="https://codingsmu.tistory.com/170" className="go-source" target="_blank" rel="noopener noreferrer">코딩스뮤 - [그래프 탐색] 파이썬으로 구현하는 DFS, BFS (2023-12-10)</Link>
					</p>
				</section>

				<section className="content__section">
					<h3>📌 7. 탐욕 알고리즘 (Greedy Algorithm)</h3>
					<p>
						탐욕 알고리즘은 “지금 당장 **좋아 보이는 선택만 하는**” 방식입니다.  
						단순하지만 빠르고, **탐욕적 선택 속성**과 **최적 부분 구조**를 만족할 때 최적해를 보장해요.
					</p>

  					<h4>🔹 대표 예시 - 거스름돈 문제</h4>
<pre><code className="language-python">{`def min_coins(amount, coins):
    coins.sort(reverse=True)
    count = 0
    for coin in coins:
        count += amount // coin
        amount %= coin
    return count

print(min_coins(1260, [500, 100, 50, 10]))
>>> 6  # 500x2 + 100x2 + 50x1 + 10x1 = 6개`}</code></pre>

  					<h4>🔹 단계별 그리디 조건</h4>
					<ul>
						<li><strong>탐욕적 선택 속성</strong>: 현재 선택이 이후 선택에 영향을 주지 않아야 함</li>
						<li><strong>최적 부분 구조</strong>: 부분 문제의 최적해들을 모아 전체 최적해 이루기 가능</li>
					</ul>

					<p className="content__source">
						출처: <Link to="https://doing7.tistory.com/69" className="go-source" target="_blank" rel="noopener noreferrer" > doing7.tistory.com/69 - [알고리즘] 그리디(탐욕법) with Python</Link>
					</p>
				</section>

				<section className="content__section">
					<h3>📌 8. 다익스트라 알고리즘 (Dijkstra's Algorithm)</h3>
					<p>
						다익스트라 알고리즘은 **가중치가 있는 그래프에서 단일 출발점부터 모든 노드까지의 최단 경로**를 찾는 방법입니다.
						주로 우선순위 큐(heapq)를 사용해 **그리디+힙 기반**으로 효율적인 탐색이 가능합니다.
					</p>

<pre><code className="language-python">{`import heapq
def dijkstra(graph, start):
	INF = float('inf')
	dist = {node: INF for node in graph}
	dist[start] = 0
	pq = [(0, start)]

	while pq:
		curr_d, u = heapq.heappop(pq)
		if curr_d > dist[u]:
			continue
		for v, weight in graph[u]:
			nd = curr_d + weight
			if nd < dist[v]:
				dist[v] = nd
				heapq.heappush(pq, (nd, v))

	return dist

# 사용 예
graph = {
	'A': [('B', 1), ('C', 4)],
	'B': [('C', 2), ('D', 5)],
	'C': [('D', 1)],
	'D': []
}
print(dijkstra(graph, 'A'))
>>> {'A': 0, 'B': 1, 'C': 3, 'D': 4}`}  
</code></pre>

					<p className="content__source">
						출처: <Link to="https://seanpark11.tistory.com/127" className="go-source" target="_blank" rel="noopener noreferrer">seanpark11.tistory.com/127 - [알고리즘] 파이썬으로 다익스트라(Dijkstra) 알고리즘 구현하기 (2024-09-19)</Link>
					</p>
				</section>

				<section className="content__section">
					<h3>📌 9. 최소 신장 트리 (Minimum Spanning Tree)</h3>
					<p>
						최소 신장 트리(MST)는 **가중치가 있는 무방향 그래프에서 모든 노드를 연결하되**,  
						**간선들의 가중치 합을 최소화**한 트리를 말합니다.  
						대표적인 방법은 **크루스칼(Kruskal) 알고리즘**입니다.
					</p>

<pre><code className="language-python">{`# 크루스칼 알고리즘 예시 (서로소 집합 기반)
def find(parent, x):
    if parent[x] != x:
        parent[x] = find(parent, parent[x])
    return parent[x]

def union(parent, a, b):
    a = find(parent, a)
    b = find(parent, b)
    if a < b:
        parent[b] = a
    else:
        parent[a] = b

def kruskal(v, edges):
    parent = list(range(v + 1))
    edges.sort(key=lambda x: x[2])
    mst_cost = 0
    for cost, a, b in edges:
        if find(parent, a) != find(parent, b):
            union(parent, a, b)
            mst_cost += cost
    return mst_cost

# 사용 예
v, edges = 4, [(1, 2, 1), (2, 3, 2), (1, 3, 3), (2, 4, 4)]
print(kruskal(v, edges))
>>> 7  (1-2, 2-3, 2-4 선택)`}</code></pre>

					<p className="content__source">
						출처: <Link to="https://techblog-history-younghunjo1.tistory.com/262" className="go-source" target="_blank" rel="noopener noreferrer">앎의 공간 - [Python] 최소 신장 트리를 찾는 크루스칼(Kruskal) 알고리즘</Link>
					</p>
				</section>
				
				<section className="content__section">
					<h3>📌 10. 백트래킹 (Backtracking)</h3>
					<p>
						백트래킹은 재귀를 기반으로 가능한 모든 경우를 탐색하되,  
						조건에 맞지 않으면 **즉시 되돌아가는(가지치기)** 알고리즘입니다.  
						DFS와 비슷하지만, **효율성을 위해 불필요한 탐색을 줄이는 점이 핵심**이에요.
					</p>

<pre><code className="language-python">{`# Seanpark 블로그 기반 예제 (2024-12-31)

# 조합 생성 문제: 리스트에서 길이 k 조합 생성
def generate_combinations(nums, k):
	result = []
	def backtrack(start, comb):
		if len(comb) == k:
			result.append(comb[:])
			return
		for i in range(start, len(nums)):
			comb.append(nums[i])
			backtrack(i + 1, comb)
			comb.pop()

	backtrack(0, [])
	return result

print(generate_combinations([1, 2, 3, 4], 2))
>>> [[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]]`}</code></pre>

<pre><code className="language-python">{`# 일반적인 백트래킹 구조
def backtrack(state):
	if is_solution(state):
		handle_solution(state)
		return

	for option in candidates(state):
		if is_promising(option):
			make_move(option)
			backtrack(state)
			undo_move(option)`}
</code></pre>

					<p className="content__source">
						출처: <Link to="https://seanpark11.tistory.com/196" className="go-source" target="_blank" rel="noopener noreferrer">seanpark11.tistory.com/196 - 파이썬으로 백트래킹 구현하기 (Backtracking) (2024-12-31)</Link>
					</p>
				</section>


			</div>
		</div>
	);
}

export default Content;
