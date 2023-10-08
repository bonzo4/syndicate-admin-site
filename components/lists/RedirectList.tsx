'use client';

import { useRedirectList } from '@/hooks/redirects';
import { Database } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

export function RedirectList() {
  const supabase = createClientComponentClient<Database>();

  const [page, setPage] = useState<number>(0);

  const [newRedirect, setNewRedirect] = useState<string>('');

  const redirects = useRedirectList({
    supabase,
    page,
  });

  const onRedirectSubmit = async () => {
    if (newRedirect === '') return;
    const { data, error } = await supabase
      .from('website_redirects')
      .insert({
        name: newRedirect,
      })
      .select('*')
      .single();

    if (error) alert(error.message);
    if (!data) return;

    redirects.push(data);
    setNewRedirect('');
  };

  const deleteRedirect = async (name: string) => {
    const { error } = await supabase
      .from('website_redirects')
      .delete()
      .eq('name', name);

    if (error) alert(error.message);

    const index = redirects.findIndex((redirect) => redirect.name === name);
    redirects.splice(index, 1);
  };

  return (
    <div className='flex w-full flex-col items-center space-y-2'>
      <div className='flex flex-row space-x-2'>
        <input
          className='rounded-md bg-gray-800 px-4 py-2 text-white'
          placeholder='New redirect'
          onChange={(e) => setNewRedirect(e.target.value)}
          value={newRedirect}
        ></input>
        <button className='bg-slate-900 px-2 py-3 ' onClick={onRedirectSubmit}>
          Add
        </button>
      </div>
      <table className='table-auto'>
        <thead>
          <tr>
            <th className='px-4 py-2'>Rank</th>
            <th className='px-4 py-2'>Name</th>
            <th className='px-4 py-2'>Clicks</th>
            <th className='px-4 py-2'>Link</th>
            <th className='px-4 py-2'>Delete</th>
          </tr>
        </thead>
        <tbody className=''>
          {redirects.map((redirect, index) => (
            <tr key={redirect.name}>
              <td className='border px-4 py-2'>{index + 1}.</td>
              <td className='flex flex-row space-x-2 border px-4 py-2'>
                <h1 className='text-white'>{redirect.name}</h1>
              </td>
              <td className='border px-4 py-2'>{redirect.clicks}</td>
              <td className='border px-4 py-2'>
                <a
                  target='_blank'
                  rel='noreferrer'
                  href={`https://www.syndicatenetwork.io/api/redirect?name=${redirect.name}`}
                >
                  https://www.syndicatenetwork.io/api/redirect?name=
                  {redirect.name}
                </a>
              </td>
              <td className='border px-4 py-2'>
                <button className='bg-slate-900 ' onClick={onRedirectSubmit}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex flex-row space-x-2'>
        {page > 0 && (
          <button
            className='bg-slate-900 px-2 py-3 '
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
        )}
        <button
          className='bg-slate-900 px-2 py-3 '
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
