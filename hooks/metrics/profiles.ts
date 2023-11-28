import { Database } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

export function useSolProfileCounts(
  supabase: SupabaseClient<Database>
): number {
  const [solProfileCount, setSolProfileCount] = useState<number>(0);

  useEffect(() => {
    const fetchSolProfileCount = async () => {
      const { count, error } = await supabase
        .from('profiles')
        .select('discord_id', { count: 'exact' })
        .neq('sol_wallet', null);
      if (error) {
        console.log(error);
        return;
      }
      if (count) {
        setSolProfileCount(count);
      }
    };
    fetchSolProfileCount();
  }, [supabase]);

  return solProfileCount;
}

export function useSolProfilePoints(
  supabase: SupabaseClient<Database>
): number {
  const [solProfilePoints, setSolProfilePoints] = useState<number>(0);

  useEffect(() => {
    const fetchSolProfilePoints = async () => {
      const { data, error } = await supabase.rpc('get_sol_profile_points');
      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        setSolProfilePoints(data);
      }
    };
    fetchSolProfilePoints();
  }, [supabase]);

  return solProfilePoints;
}

export function useEthProfileCounts(
  supabase: SupabaseClient<Database>
): number {
  const [ethProfileCount, setEthProfileCount] = useState<number>(0);

  useEffect(() => {
    const fetchEthProfileCount = async () => {
      const { count, error } = await supabase
        .from('profiles')
        .select('discord_id', { count: 'exact' })
        .neq('eth_wallet', null);
      if (error) {
        console.log(error);
        return;
      }
      if (count) {
        setEthProfileCount(count);
      }
    };
    fetchEthProfileCount();
  }, [supabase]);

  return ethProfileCount;
}

export function useEthProfilePoints(
  supabase: SupabaseClient<Database>
): number {
  const [ethProfilePoints, setEthProfilePoints] = useState<number>(0);

  useEffect(() => {
    const fetchEthProfilePoints = async () => {
      const { data, error } = await supabase.rpc('get_eth_profile_points');
      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        setEthProfilePoints(data);
      }
    };
    fetchEthProfilePoints();
  }, [supabase]);

  return ethProfilePoints;
}
