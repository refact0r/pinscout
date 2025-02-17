<script>
	import { goto } from "$app/navigation";
    import {UserCircle} from "phosphor-svelte";
    export let logged_in;

    function go() {
        if (logged_in) {
            goto('/dashboard')
        } else {
            goto('/login')
        }
    }
</script>

<div class="position">
	<div class="header" on:click={()=>go()}>
        <a>0 PP&nbsp;</a>
		<a><UserCircle /></a>
	</div>
</div>

<style>
	.position {
		width: fit-content;
	}
	.header {
		margin: 1rem;
		border-radius: 1rem;
		padding: .5rem .75rem;
		background-color: rgba(255, 255, 255, 0.75);
		display: flex;
		align-items: center;
		justify-content: space-between;
		backdrop-filter: blur(4px);
		font-size: 1.5rem;
        color: black;
		text-decoration: none;
        transition: .2s;
	}
    .header:hover {
        color: rgb(234, 72, 78);
        background-color: rgba(255, 255, 255, 1);
        cursor:pointer;
    }
	a {
		display: flex;
	}
</style>