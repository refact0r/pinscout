<script>
</script>

<div class="content">
	<div class="dashboard">
		<h1>Your Dashboard</h1>
		<div class="stats">
			<div class="greeting">
				<p>Good _, User.</p>
			</div>
			<div class="points"></div>
		</div>
	</div>
</div>

<style>
	.content {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 2;
		background-color: rgba(73, 171, 207, 1);
	}
	.dashboard {
		margin: 4vh 4vw;
		padding: 2vh 2vw;

		background-color: rgba(255, 255, 255, 0.6);
		border-radius: 1vw;
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
