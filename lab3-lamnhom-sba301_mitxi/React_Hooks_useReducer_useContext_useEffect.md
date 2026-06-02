# React Hooks: useReducer, useContext, useEffect

> Tài liệu học tập – Lý thuyết & 10 bài tập thực hành

---

## MỤC LỤC

1. [useReducer](#1-usereducer)
2. [useContext](#2-usecontext)
3. [useEffect](#3-useeffect)
4. [Kết hợp 3 Hooks](#4-kết-hợp-3-hooks)
5. [10 Bài tập thực hành](#5-bài-tập-thực-hành)

---

## 1. useReducer

### 1.1 Khái niệm

`useReducer` là một React Hook dùng để quản lý **state phức tạp**, thay thế cho `useState` khi logic cập nhật state có nhiều trường hợp (cases) hoặc khi state tiếp theo phụ thuộc vào state trước đó.

> 💡 Tư tưởng giống Redux: **dispatch action → reducer xử lý → trả về state mới**

### 1.2 Cú pháp

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

| Tham số        | Mô tả                                                  |
|----------------|--------------------------------------------------------|
| `reducer`      | Hàm `(state, action) => newState` xử lý logic cập nhật |
| `initialState` | Giá trị state khởi tạo                                 |
| `state`        | State hiện tại                                         |
| `dispatch`     | Hàm gọi để kích hoạt action                            |

### 1.3 Cấu trúc Reducer

```js
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state; // Luôn có default!
  }
}
```

### 1.4 Ví dụ cơ bản – Bộ đếm

```jsx
import { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    case 'DECREMENT': return { count: state.count - 1 };
    case 'RESET':     return initialState;
    default:          return state;
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}
```

### 1.5 Khi nào dùng useReducer thay vì useState?

| Tình huống                                | Nên dùng      |
|-------------------------------------------|---------------|
| State là 1–2 giá trị đơn giản             | `useState`    |
| State là object/array phức tạp            | `useReducer`  |
| Logic cập nhật đơn giản                   | `useState`    |
| Nhiều actions khác nhau tác động vào state| `useReducer`  |
| State tiếp theo phụ thuộc state trước     | `useReducer`  |

---

## 2. useContext

### 2.1 Khái niệm

`useContext` cho phép component **đọc và đăng ký** dữ liệu từ một Context, giải quyết vấn đề **prop drilling** (truyền props qua nhiều tầng component không cần thiết).

```
App
 └── Parent (không cần theme)
      └── Child (không cần theme)
           └── GrandChild ← cần theme
```

Thay vì truyền `theme` qua từng tầng, dùng Context để GrandChild đọc thẳng.

### 2.2 Các bước sử dụng

**Bước 1: Tạo Context**
```js
import { createContext } from 'react';
export const ThemeContext = createContext(null);
```

**Bước 2: Cung cấp giá trị (Provider)**
```jsx
import { ThemeContext } from './ThemeContext';

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Parent />
    </ThemeContext.Provider>
  );
}
```

**Bước 3: Đọc giá trị (Consumer)**
```jsx
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function GrandChild() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className={theme}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}
```

### 2.3 Lưu ý quan trọng

- Khi giá trị trong Provider thay đổi, **tất cả** các component dùng `useContext` với context đó sẽ **re-render**.
- Không nên nhét quá nhiều dữ liệu vào 1 context – hãy **tách context** theo domain (UserContext, ThemeContext, CartContext…).
- Context **không thay thế** state management library như Redux/Zustand khi app quá lớn.

---

## 3. useEffect

### 3.1 Khái niệm

`useEffect` cho phép thực hiện các **side effects** trong function component: gọi API, cập nhật DOM, đăng ký event listener, set timer, v.v.

> Side effect = bất cứ điều gì tương tác với thế giới bên ngoài component (network, DOM, timer…)

### 3.2 Cú pháp

```js
useEffect(() => {
  // Code side effect

  return () => {
    // Cleanup (tùy chọn)
  };
}, [dependencies]);
```

### 3.3 Ba dạng dependency array

```jsx
// 1️⃣ Chạy sau MỖI lần render
useEffect(() => {
  console.log('Chạy mỗi lần render');
});

// 2️⃣ Chạy CHỈ một lần sau lần render đầu (mount)
useEffect(() => {
  console.log('Chạy 1 lần duy nhất – như componentDidMount');
}, []);

// 3️⃣ Chạy khi dependency thay đổi
useEffect(() => {
  console.log('userId thay đổi:', userId);
}, [userId]);
```

### 3.4 Cleanup function

```jsx
useEffect(() => {
  const timerId = setInterval(() => {
    setCount(c => c + 1);
  }, 1000);

  // Cleanup: xóa interval khi component unmount hoặc trước lần effect tiếp theo
  return () => clearInterval(timerId);
}, []);
```

Cleanup quan trọng để tránh **memory leak** và các lỗi khó phát hiện.

### 3.5 Ví dụ gọi API

```jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    let cancelled = false; // tránh race condition

    async function fetchUser() {
      try {
        setLoading(true);
        const res  = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const data = await res.json();
        if (!cancelled) setUser(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchUser();
    return () => { cancelled = true; }; // cleanup
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error)   return <p>Error: {error}</p>;
  return <p>{user?.name}</p>;
}
```

---

## 4. Kết hợp 3 Hooks

Bộ ba hooks này thường được dùng chung trong pattern **Context + Reducer** để xây dựng global state management nhẹ:

```jsx
// store/cartContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
```

---

## 5. Bài tập thực hành

---

### Bài 1: Bộ đếm nâng cao (useReducer)

**Yêu cầu:** Xây dựng bộ đếm với các chức năng: tăng, giảm, reset, tăng theo bước nhảy tùy chỉnh.

**Gợi ý cấu trúc state:**
```js
const initialState = { count: 0, step: 1 };
```

**Giải mẫu:**
```jsx
import { useReducer } from 'react';

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': return { ...state, count: state.count + state.step };
    case 'DECREMENT': return { ...state, count: state.count - state.step };
    case 'RESET':     return initialState;
    case 'SET_STEP':  return { ...state, step: Number(action.payload) };
    default:          return state;
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <h2>Count: {state.count}</h2>
      <label>
        Bước nhảy:
        <input
          type="number"
          value={state.step}
          onChange={e => dispatch({ type: 'SET_STEP', payload: e.target.value })}
        />
      </label>
      <br />
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+{state.step}</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-{state.step}</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}
```

---

### Bài 2: Quản lý Todo List (useReducer)

**Yêu cầu:** Ứng dụng todo với: thêm, xoá, đánh dấu hoàn thành, lọc (all/active/completed).

**Giải mẫu:**
```jsx
import { useReducer, useState } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), text: action.payload, done: false }];
    case 'TOGGLE':
      return state.map(t => t.id === action.payload ? { ...t, done: !t.done } : t);
    case 'DELETE':
      return state.filter(t => t.id !== action.payload);
    default:
      return state;
  }
}

export default function TodoApp() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [input, setInput]   = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = todos.filter(t =>
    filter === 'all'       ? true :
    filter === 'active'    ? !t.done :
    filter === 'completed' ? t.done : true
  );

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="New todo..." />
      <button onClick={() => { dispatch({ type: 'ADD', payload: input }); setInput(''); }}>
        Add
      </button>
      <div>
        {['all','active','completed'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ fontWeight: filter === f ? 'bold' : 'normal' }}>
            {f}
          </button>
        ))}
      </div>
      <ul>
        {filtered.map(t => (
          <li key={t.id}>
            <span
              onClick={() => dispatch({ type: 'TOGGLE', payload: t.id })}
              style={{ textDecoration: t.done ? 'line-through' : 'none', cursor: 'pointer' }}
            >
              {t.text}
            </span>
            <button onClick={() => dispatch({ type: 'DELETE', payload: t.id })}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

### Bài 3: Theme Light/Dark (useContext)

**Yêu cầu:** Tạo ThemeContext để toggle giữa light/dark mode, áp dụng cho toàn app.

**Giải mẫu:**
```jsx
// ThemeContext.jsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div style={{
        background: theme === 'light' ? '#fff' : '#222',
        color:      theme === 'light' ? '#000' : '#fff',
        minHeight: '100vh', padding: '20px'
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

// App.jsx
import { ThemeProvider, useTheme } from './ThemeContext';

function Header() {
  const { theme, toggle } = useTheme();
  return (
    <header>
      <h1>My App ({theme} mode)</h1>
      <button onClick={toggle}>Toggle Theme</button>
    </header>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Header />
      <p>Nội dung trang web ở đây...</p>
    </ThemeProvider>
  );
}
```

---

### Bài 4: Giỏ hàng với Context + Reducer

**Yêu cầu:** Xây dựng giỏ hàng (thêm, xóa, cập nhật số lượng) dùng `useContext` + `useReducer`.

**Giải mẫu:**
```jsx
// CartContext.jsx
import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const exists = state.find(i => i.id === action.payload.id);
      if (exists) return state.map(i => i.id === action.payload.id
        ? { ...i, qty: i.qty + 1 } : i);
      return [...state, { ...action.payload, qty: 1 }];
    }
    case 'REMOVE':
      return state.filter(i => i.id !== action.payload);
    case 'UPDATE_QTY':
      return state.map(i => i.id === action.payload.id
        ? { ...i, qty: action.payload.qty } : i);
    default: return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  return (
    <CartContext.Provider value={{ cart, dispatch, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

// ProductList.jsx
import { useCart } from './CartContext';

const PRODUCTS = [
  { id: 1, name: 'Áo T-shirt', price: 150000 },
  { id: 2, name: 'Quần Jeans',  price: 350000 },
  { id: 3, name: 'Giày Sneaker',price: 800000 },
];

export function ProductList() {
  const { dispatch } = useCart();
  return (
    <div>
      <h2>Sản phẩm</h2>
      {PRODUCTS.map(p => (
        <div key={p.id}>
          <span>{p.name} – {p.price.toLocaleString()}đ</span>
          <button onClick={() => dispatch({ type: 'ADD', payload: p })}>
            Thêm vào giỏ
          </button>
        </div>
      ))}
    </div>
  );
}

// Cart.jsx
import { useCart } from './CartContext';

export function Cart() {
  const { cart, dispatch, total } = useCart();
  return (
    <div>
      <h2>Giỏ hàng</h2>
      {cart.map(i => (
        <div key={i.id}>
          {i.name} x
          <input type="number" value={i.qty} min={1}
            onChange={e => dispatch({ type: 'UPDATE_QTY', payload: { id: i.id, qty: +e.target.value } })}
          />
          = {(i.price * i.qty).toLocaleString()}đ
          <button onClick={() => dispatch({ type: 'REMOVE', payload: i.id })}>Xóa</button>
        </div>
      ))}
      <strong>Tổng: {total.toLocaleString()}đ</strong>
    </div>
  );
}
```

---

### Bài 5: Đồng hồ đếm ngược (useEffect + cleanup)

**Yêu cầu:** Tạo countdown timer nhập số giây, bắt đầu/dừng, cleanup đúng cách khi unmount.

**Giải mẫu:**
```jsx
import { useState, useEffect } from 'react';

export default function Countdown() {
  const [seconds, setSeconds]   = useState(60);
  const [running, setRunning]   = useState(false);
  const [input,   setInput]     = useState(60);

  useEffect(() => {
    if (!running) return;
    if (seconds <= 0) { setRunning(false); return; }

    const id = setInterval(() => {
      setSeconds(s => s - 1);
    }, 1000);

    return () => clearInterval(id); // cleanup mỗi lần effect chạy lại
  }, [running, seconds]);

  const start  = () => { setSeconds(input); setRunning(true); };
  const pause  = () => setRunning(false);
  const resume = () => setRunning(true);

  const pct = (seconds / input) * 100;

  return (
    <div>
      <div style={{
        width: 100, height: 100, borderRadius: '50%',
        background: `conic-gradient(tomato ${pct}%, #eee 0)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 24, fontWeight: 'bold'
      }}>
        {seconds}s
      </div>
      <input type="number" value={input}
        onChange={e => setInput(+e.target.value)} disabled={running} />
      {!running && seconds > 0 && (
        <button onClick={seconds === input ? start : resume}>
          {seconds === input ? 'Bắt đầu' : 'Tiếp tục'}
        </button>
      )}
      {running && <button onClick={pause}>Tạm dừng</button>}
      {seconds === 0 && <p>⏰ Hết giờ!</p>}
    </div>
  );
}
```

---

### Bài 6: Fetch dữ liệu & hiển thị danh sách (useEffect)

**Yêu cầu:** Gọi API `https://jsonplaceholder.typicode.com/posts`, hiển thị danh sách bài viết, xử lý loading/error, có nút "Load more".

**Giải mẫu:**
```jsx
import { useState, useEffect } from 'react';

export default function PostList() {
  const [posts,   setPosts]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const [page,    setPage]    = useState(1);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`)
      .then(r => r.json())
      .then(data => {
        if (!cancelled) setPosts(prev => page === 1 ? data : [...prev, ...data]);
      })
      .catch(err => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [page]);

  return (
    <div>
      <h2>Bài viết</h2>
      {error && <p style={{ color: 'red' }}>Lỗi: {error}</p>}
      <ul>
        {posts.map(p => (
          <li key={p.id}>
            <strong>{p.title}</strong>
            <p>{p.body}</p>
          </li>
        ))}
      </ul>
      {loading && <p>Đang tải...</p>}
      {!loading && (
        <button onClick={() => setPage(p => p + 1)}>Load more</button>
      )}
    </div>
  );
}
```

---

### Bài 7: Xác thực Form (useReducer)

**Yêu cầu:** Form đăng ký (username, email, password, confirmPassword) với validation bằng `useReducer`.

**Giải mẫu:**
```jsx
import { useReducer } from 'react';

const initialState = {
  values: { username: '', email: '', password: '', confirmPassword: '' },
  errors: {},
  submitted: false,
};

function validate(values) {
  const errs = {};
  if (values.username.length < 3)       errs.username = 'Tối thiểu 3 ký tự';
  if (!/\S+@\S+\.\S+/.test(values.email)) errs.email = 'Email không hợp lệ';
  if (values.password.length < 6)       errs.password = 'Tối thiểu 6 ký tự';
  if (values.password !== values.confirmPassword) errs.confirmPassword = 'Mật khẩu không khớp';
  return errs;
}

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE': {
      const values = { ...state.values, [action.field]: action.value };
      return { ...state, values, errors: validate(values) };
    }
    case 'SUBMIT': {
      const errors = validate(state.values);
      return { ...state, errors, submitted: Object.keys(errors).length === 0 };
    }
    default: return state;
  }
}

export default function RegisterForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { values, errors, submitted } = state;

  if (submitted) return <p>✅ Đăng ký thành công! Chào {values.username}!</p>;

  return (
    <form onSubmit={e => { e.preventDefault(); dispatch({ type: 'SUBMIT' }); }}>
      {['username','email','password','confirmPassword'].map(field => (
        <div key={field}>
          <label>{field}:</label>
          <input
            type={field.includes('assword') ? 'password' : 'text'}
            value={values[field]}
            onChange={e => dispatch({ type: 'CHANGE', field, value: e.target.value })}
          />
          {errors[field] && <span style={{ color: 'red' }}> {errors[field]}</span>}
        </div>
      ))}
      <button type="submit">Đăng ký</button>
    </form>
  );
}
```

---

### Bài 8: Đa ngôn ngữ (i18n) với useContext

**Yêu cầu:** Tạo hệ thống đa ngôn ngữ (Tiếng Việt / English) dùng `useContext`.

**Giải mẫu:**
```jsx
// i18nContext.jsx
import { createContext, useContext, useState } from 'react';

const translations = {
  vi: { greeting: 'Xin chào', farewell: 'Tạm biệt', language: 'Ngôn ngữ' },
  en: { greeting: 'Hello',    farewell: 'Goodbye',   language: 'Language' },
};

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState('vi');
  const t = key => translations[locale][key] ?? key;
  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);

// App.jsx
import { I18nProvider, useI18n } from './i18nContext';

function Page() {
  const { locale, setLocale, t } = useI18n();
  return (
    <div>
      <h1>{t('greeting')}!</h1>
      <p>{t('farewell')}</p>
      <label>{t('language')}: </label>
      <select value={locale} onChange={e => setLocale(e.target.value)}>
        <option value="vi">Tiếng Việt</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}

export default function App() {
  return <I18nProvider><Page /></I18nProvider>;
}
```

---

### Bài 9: Debounce Search (useEffect)

**Yêu cầu:** Thanh tìm kiếm với debounce 500ms, gọi API chỉ khi người dùng ngừng gõ, hiển thị kết quả.

**Giải mẫu:**
```jsx
import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id); // reset mỗi khi value thay đổi
  }, [value, delay]);

  return debounced;
}

export default function SearchUsers() {
  const [query,   setQuery]   = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery.trim()) { setResults([]); return; }

    let cancelled = false;
    setLoading(true);

    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${debouncedQuery}`)
      .then(r => r.json())
      .then(data => { if (!cancelled) setResults(data); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [debouncedQuery]);

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Tìm kiếm người dùng..."
      />
      {loading && <p>Đang tìm...</p>}
      <ul>
        {results.map(u => (
          <li key={u.id}>{u.name} – {u.email}</li>
        ))}
      </ul>
      {!loading && debouncedQuery && results.length === 0 && (
        <p>Không tìm thấy kết quả.</p>
      )}
    </div>
  );
}
```

---

### Bài 10: Mini App Quản lý Dự án (useReducer + useContext + useEffect)

**Yêu cầu:** Ứng dụng kết hợp cả 3 hooks – quản lý tasks theo dự án, lưu vào localStorage, hỗ trợ thêm/xóa/cập nhật trạng thái task.

**Giải mẫu:**
```jsx
// projectContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react';

const ProjectContext = createContext();

const STATUS = ['Todo', 'In Progress', 'Done'];

function getInitial() {
  try {
    return JSON.parse(localStorage.getItem('tasks')) ?? [];
  } catch { return []; }
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { id: Date.now(), title: action.title, status: 'Todo' }];
    case 'DELETE_TASK':
      return state.filter(t => t.id !== action.id);
    case 'MOVE_TASK':
      return state.map(t => t.id !== action.id ? t : {
        ...t, status: STATUS[(STATUS.indexOf(t.status) + 1) % STATUS.length]
      });
    default: return state;
  }
}

export function ProjectProvider({ children }) {
  const [tasks, dispatch] = useReducer(reducer, [], getInitial);

  // Sync to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const byStatus = status => tasks.filter(t => t.status === status);

  return (
    <ProjectContext.Provider value={{ tasks, dispatch, byStatus, STATUS }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProject = () => useContext(ProjectContext);

// Board.jsx
import { useState } from 'react';
import { ProjectProvider, useProject } from './projectContext';

function Column({ status }) {
  const { byStatus, dispatch } = useProject();
  return (
    <div style={{ flex: 1, background: '#f0f0f0', padding: 12, borderRadius: 8 }}>
      <h3>{status}</h3>
      {byStatus(status).map(task => (
        <div key={task.id} style={{ background: '#fff', padding: 8, marginBottom: 8, borderRadius: 4 }}>
          <p>{task.title}</p>
          <button onClick={() => dispatch({ type: 'MOVE_TASK', id: task.id })}>→ Next</button>
          <button onClick={() => dispatch({ type: 'DELETE_TASK', id: task.id })}>🗑</button>
        </div>
      ))}
    </div>
  );
}

function AddTask() {
  const { dispatch } = useProject();
  const [title, setTitle] = useState('');
  return (
    <div style={{ marginBottom: 16 }}>
      <input value={title} onChange={e => setTitle(e.target.value)}
        placeholder="Tên task mới..." />
      <button onClick={() => {
        if (title.trim()) { dispatch({ type: 'ADD_TASK', title }); setTitle(''); }
      }}>
        + Thêm Task
      </button>
    </div>
  );
}

function Board() {
  const { STATUS } = useProject();
  return (
    <div>
      <h1>🗂 Project Board</h1>
      <AddTask />
      <div style={{ display: 'flex', gap: 12 }}>
        {STATUS.map(s => <Column key={s} status={s} />)}
      </div>
    </div>
  );
}

export default function App() {
  return <ProjectProvider><Board /></ProjectProvider>;
}
```

---

## Tổng kết

| Hook          | Dùng khi                                             |
|---------------|------------------------------------------------------|
| `useReducer`  | State phức tạp, nhiều actions, logic chuyển trạng thái |
| `useContext`  | Chia sẻ dữ liệu toàn cục, tránh prop drilling        |
| `useEffect`   | Side effects: fetch API, timer, event listener, DOM  |

**Kết hợp tốt nhất:** `useContext` + `useReducer` = global state management nhẹ không cần Redux, `useEffect` để đồng bộ dữ liệu với bên ngoài.

---

*Chúc bạn học tốt! 🚀*
