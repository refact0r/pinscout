<script>
	import { userState } from '$lib/state.svelte';
	import { logout } from '$lib/supabaseClient';

    import {WarningCircle, ArrowSquareOut} from 'phosphor-svelte'
</script>

<svelte:head>
	<title>pinscout</title>
</svelte:head>

<!--This first case of if statement is useless since container size will be 0 if user is logged in, user can logout through dashboard-->
{#if userState.user}
	<button on:click={logout}>Sign Out</button>
	<h1>{userState.user?.email}</h1>
{:else}
    <div class="inline">
        <a class="a"><WarningCircle /></a>
        <a class="a">Not Logged In</a>
    </div>
	<p>Login to mark new locations, place reviews, earn pinpoints, and more!&nbsp;&nbsp;<a class="link" href="/login">Login<ArrowSquareOut/></a></p>
{/if}

<style>
    .inline {
        display: flex;
        gap: .25rem;
        align-items: center;
		font-size: 1.2rem;
    }
    .a{
        align-items: center;
        display:flex;
    }
    .link{
        align-items: center;
        color:black;
        text-decoration: underline;
        transition: .2s;
    }
    .link:hover{
        color:rgb(234, 72, 78);
        text-decoration: underline;
    }
</style>
