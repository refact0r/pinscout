<script>
	import { userState } from '$lib/state.svelte';
</script>

<div class="content">
	<div class="dashboard">
		<h1>Your Dashboard</h1>
		<div class="stats">
			<div class="greeting">
				<p>Good _, {userState.user?.name}.</p>
			</div>
			<div class="points">{userState.user?.points} PP</div>
		</div>
	</div>
</div>

<style>
	.content {
        width: 100%;
	}
	.dashboard {
		background-color: rgb(123, 195, 222);
		border-radius: 1vw;
		padding: 2vh 2vw;
	}
	.stats {
		display: flex;
		gap: 2%;
	}
	.greeting {
		flex: 36%;
	}
	.summary {
		flex: 62%;
	}
</style>
