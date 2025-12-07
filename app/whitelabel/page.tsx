"use client";
import React from "react";

export default function WhitelabelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-primary">White-label Agency Portal</h1>
        <p className="text-center text-gray-500">Welcome to the agency portal.</p>
      </div>
    </div>
  );
}
"use client";
import React from "react";

export default function WhitelabelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-primary">White-label Agency Portal</h1>
        <p className="text-center text-gray-500">Welcome to the agency portal.</p>
      </div>
    </div>
  );
}
"use client";
import React from "react";

export default function WhitelabelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-primary">White-label Agency Portal</h1>
        <p className="text-center text-gray-500">Welcome to the agency portal.</p>
      </div>
    </div>
  );
}
"use client";
import { useState, useEffect } from "react";
import { agencyLogin, getAgencyPortal } from "@/lib/whitelabelApi";
import { getClients } from "@/lib/whitelabelClientApi";

export default function WhitelabelPortalPage() {
  const [step, setStep] = useState<'login' | 'portal'>('login');
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('demo123');
  const [token, setToken] = useState('');
  const [agency, setAgency] = useState<any>(null);
  const [clients, setClients] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await agencyLogin(email, password);
      setToken(res.token);
      const portal = await getAgencyPortal(res.id, res.token);
      setAgency(portal);
      setStep('portal');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Try demo@example.com / demo123');
    }
  };

  // Fetch clients when in portal
  useEffect(() => {
    if (step === 'portal' && token && agency?.id) {
      getClients(agency.id, token).then(setClients).catch(() => setClients([]));
    }
  }, [step, token, agency]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-primary">White-label Agency Portal</h1>
        {step === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Agency Email"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg font-semibold">Login</button>
          </form>
        )}
        {step === 'portal' && agency && (
          <div>
            <h2 className="text-lg font-bold mb-4">Welcome, {agency.name}</h2>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                placeholder="Müşteri ara..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="px-3 py-2 border rounded-lg w-full"
              />
            </div>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full bg-white rounded-xl shadow border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Ad Soyad</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Şehir</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">E-posta</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.filter(c =>
                    c.name.toLowerCase().includes(search.toLowerCase()) ||
                    c.city.toLowerCase().includes(search.toLowerCase()) ||
                    c.email.toLowerCase().includes(search.toLowerCase())
                  ).map((client: any) => (
                    <tr key={client.id} className="border-b hover:bg-blue-50">
                      <td className="px-4 py-2 font-semibold text-gray-900">{client.name}</td>
                      <td className="px-4 py-2">{client.city}</td>
                      <td className="px-4 py-2">{client.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
"use client";
import { useState, useEffect } from "react";
import { agencyLogin, getAgencyPortal } from "@/lib/whitelabelApi";
import { getClients } from "@/lib/whitelabelClientApi";

export default function WhitelabelPortalPage() {
  const [step, setStep] = useState<'login' | 'portal'>('login');
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('demo123');
  const [token, setToken] = useState('');
  const [agency, setAgency] = useState<any>(null);
  const [clients, setClients] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await agencyLogin(email, password);
      setToken(res.token);
      const portal = await getAgencyPortal(res.id, res.token);
      setAgency(portal);
      setStep('portal');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Try demo@example.com / demo123');
    }
  };

  // Fetch clients when in portal
  useEffect(() => {
    if (step === 'portal' && token && agency?.id) {
      getClients(agency.id, token).then(setClients).catch(() => setClients([]));
    }
  }, [step, token, agency]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-primary">White-label Agency Portal</h1>
        {step === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Agency Email"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg font-semibold">Login</button>
          </form>
        )}
        {step === 'portal' && agency && (
          <div>
            <h2 className="text-lg font-bold mb-4">Welcome, {agency.name}</h2>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                placeholder="Müşteri ara..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="px-3 py-2 border rounded-lg w-full"
              />
            </div>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full bg-white rounded-xl shadow border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Ad Soyad</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Şehir</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">E-posta</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.filter(c =>
                    c.name.toLowerCase().includes(search.toLowerCase()) ||
                    c.city.toLowerCase().includes(search.toLowerCase()) ||
                    c.email.toLowerCase().includes(search.toLowerCase())
                  ).map((client: any) => (
                    <tr key={client.id} className="border-b hover:bg-blue-50">
                      <td className="px-4 py-2 font-semibold text-gray-900">{client.name}</td>
                      <td className="px-4 py-2">{client.city}</td>
                      <td className="px-4 py-2">{client.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
"use client";
import { useState, useEffect } from "react";
import { agencyLogin, getAgencyPortal } from "@/lib/whitelabelApi";
import { getClients } from "@/lib/whitelabelClientApi";
                              "use client";
export default function WhitelabelPortalPage() {
  const [step, setStep] = useState<'login' | 'portal'>('login');
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('demo123');
  const [token, setToken] = useState('');
  const [agency, setAgency] = useState<any>(null);
  const [clients, setClients] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
                              import { useState, useEffect } from "react";
  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await agencyLogin(email, password);
      setToken(res.token);
      const portal = await getAgencyPortal(res.id, res.token);
      setAgency(portal);
      setStep('portal');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Try demo@example.com / demo123');
    }
  };
                              import { agencyLogin, getAgencyPortal } from "@/lib/whitelabelApi";
  // Fetch clients when in portal
  useEffect(() => {
    if (step === 'portal' && token && agency?.id) {
      getClients(agency.id, token).then(setClients).catch(() => setClients([]));
    }
  }, [step, token, agency]);
                              import { getClients } from "@/lib/whitelabelClientApi";
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-primary">White-label Agency Portal</h1>
        {step === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Agency Email"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg font-semibold">Login</button>
          </form>
        )}
        {step === 'portal' && agency && (
          <div>
            <h2 className="text-lg font-bold mb-4">Welcome, {agency.name}</h2>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                placeholder="Müşteri ara..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="px-3 py-2 border rounded-lg w-full"
              />
            </div>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full bg-white rounded-xl shadow border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Ad Soyad</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Şehir</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">E-posta</th>
"use client";
import { useState, useEffect } from "react";
import { agencyLogin, getAgencyPortal } from "@/lib/whitelabelApi";
import { getClients } from "@/lib/whitelabelClientApi";

export default function WhitelabelPortalPage() {
  const [step, setStep] = useState<'login' | 'portal'>('login');
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('demo123');
  const [token, setToken] = useState('');
  const [agency, setAgency] = useState<any>(null);
  const [clients, setClients] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await agencyLogin(email, password);
      setToken(res.token);
      const portal = await getAgencyPortal(res.id, res.token);
      setAgency(portal);
      setStep('portal');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Try demo@example.com / demo123');
    }
  };

  // Fetch clients when in portal
  useEffect(() => {
    if (step === 'portal' && token && agency?.id) {
      getClients(agency.id, token).then(setClients).catch(() => setClients([]));
    }
  }, [step, token, agency]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-primary">White-label Agency Portal</h1>
        {step === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Agency Email"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg font-semibold">Login</button>
          </form>
        )}
        {step === 'portal' && agency && (
          <div>
            <h2 className="text-lg font-bold mb-4">Welcome, {agency.name}</h2>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                placeholder="Müşteri ara..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="px-3 py-2 border rounded-lg w-full"
              />
            </div>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full bg-white rounded-xl shadow border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Ad Soyad</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Şehir</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">E-posta</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.filter(c =>
                    c.name.toLowerCase().includes(search.toLowerCase()) ||
                    c.city.toLowerCase().includes(search.toLowerCase()) ||
                    c.email.toLowerCase().includes(search.toLowerCase())
                  ).map((client: any) => (
                    <tr key={client.id} className="border-b hover:bg-blue-50">
                      <td className="px-4 py-2 font-semibold text-gray-900">{client.name}</td>
                      <td className="px-4 py-2">{client.city}</td>
                      <td className="px-4 py-2">{client.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

                              export default function WhitelabelPortalPage() {
                                const [step, setStep] = useState<'login' | 'portal'>('login');
                                const [email, setEmail] = useState('demo@example.com');
                                const [password, setPassword] = useState('demo123');
                                const [token, setToken] = useState('');
                                const [agency, setAgency] = useState<any>(null);
                                const [clients, setClients] = useState<any[]>([]);
                                const [search, setSearch] = useState('');
                                const [error, setError] = useState('');

                                // Login handler
                                const handleLogin = async (e: React.FormEvent) => {
                                  e.preventDefault();
                                  setError('');
                                  try {
                                    const res = await agencyLogin(email, password);
                                    setToken(res.token);
                                    const portal = await getAgencyPortal(res.id, res.token);
                                    setAgency(portal);
                                    setStep('portal');
                                  } catch (err: any) {
                                    setError(err.message || 'Invalid email or password. Try demo@example.com / demo123');
                                  }
                                };

                                // Fetch clients when in portal
                                useEffect(() => {
                                  if (step === 'portal' && token && agency?.id) {
                                    getClients(agency.id, token).then(setClients).catch(() => setClients([]));
                                  }
                                }, [step, token, agency]);

                                return (
                                  <div className="min-h-screen flex items-center justify-center bg-gray-50">
                                    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
                                      <h1 className="text-2xl font-bold mb-6 text-center text-primary">White-label Agency Portal</h1>
                                      {step === 'login' && (
                                        <form onSubmit={handleLogin} className="space-y-4">
                                          <input
                                            type="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            placeholder="Agency Email"
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                          />
                                          <input
                                            type="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            placeholder="Password"
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                          />
                                          {error && <div className="text-red-500 text-sm">{error}</div>}
                                          <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg font-semibold">Login</button>
                                        </form>
                                      )}
                                      {step === 'portal' && agency && (
                                        <div>
                                          <h2 className="text-lg font-bold mb-4">Welcome, {agency.name}</h2>
                                          <div className="flex items-center gap-2 mb-4">
                                            <input
                                              type="text"
                                              placeholder="Müşteri ara..."
                                              value={search}
                                              onChange={e => setSearch(e.target.value)}
                                              className="px-3 py-2 border rounded-lg w-full"
                                            />
                                          </div>
                                          <div className="overflow-x-auto mb-4">
                                            <table className="min-w-full bg-white rounded-xl shadow border">
                                              <thead>
                                                <tr className="bg-gray-100">
                                                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Ad Soyad</th>
                                                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Şehir</th>
                                                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">E-posta</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {clients.filter(c =>
                                                  c.name.toLowerCase().includes(search.toLowerCase()) ||
                                                  c.city.toLowerCase().includes(search.toLowerCase()) ||
                                                  c.email.toLowerCase().includes(search.toLowerCase())
                                                ).map((client: any) => (
                                                  <tr key={client.id} className="border-b hover:bg-blue-50">
                                                    <td className="px-4 py-2 font-semibold text-gray-900">{client.name}</td>
                                                    <td className="px-4 py-2">{client.city}</td>
                                                    <td className="px-4 py-2">{client.email}</td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              }
                            <button
