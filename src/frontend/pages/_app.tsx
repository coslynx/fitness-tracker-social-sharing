import { useState, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/frontend/context/ThemeContext';
import { AuthContext } from '@/frontend/context/AuthContext';
import { useStore } from '@/frontend/store';
import { useRouter } from 'next/navigation';
import Layout from '@/frontend/components/layout/Layout';
import { useFetch } from '@/frontend/hooks/useFetch';
import { getServerSideProps } from 'next/server';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Session } from 'next-auth/core/types';
import { useGoalData } from '@/frontend/hooks/useGoals';
import { useProgressData } from '@/frontend/hooks/useProgress';
import { useUser } from '@/frontend/hooks/useAuth';
import { Theme } from '@/frontend/types/theme';

export default function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  const { user, setLoggedIn } = useStore();
  const [theme, setTheme] = useState<Theme>({
    mode: 'light',
    primary: '#007bff',
    secondary: '#6c757d',
    background: '#fff',
    text: '#333',
  });
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { goals, fetchGoals } = useGoalData();
  const { progresses, fetchProgresses } = useProgressData();

  // Load initial data on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        await fetchGoals();
        await fetchProgresses();
        setLoggedIn(true);
      }
    };
    fetchData();
  }, [user, fetchGoals, fetchProgresses, setLoggedIn]);

  useEffect(() => {
    const updateTheme = async () => {
      const { data } = await supabase
        .from('user_settings')
        .select('theme')
        .eq('user_id', user?.id);
      if (data) {
        setTheme(data[0].theme);
      }
    };
    updateTheme();
  }, [user, supabase, setTheme]);

  return (
    <SessionProvider session={pageProps.session}>
      <AuthContext.Provider value={{ user }}>
        <ThemeProvider value={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </AuthContext.Provider>
    </SessionProvider>
  );
}

export const getServerSideProps = async (context: { req: any; res: any; query: any }): Promise<{ props: { session: Session } }> => {
  const session = await getSession(context);
  return { props: { session } };
};