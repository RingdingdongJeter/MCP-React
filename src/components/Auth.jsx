// component/Auth.jsx

import { supabase } from '../lib/supabaseClient'

export function Auth() {
    const loginWithGitHub = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
        })
        if (error) console.error('Login error:', error.message)
    }

    return (
        <div>
            <h2>Login</h2>
            <button onClick={loginWithGitHub}>
                Login with GitHub
            </button>
        </div>
    )
}
