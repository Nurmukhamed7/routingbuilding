import { createRouter, createWebHistory } from 'vue-router'
import TeamsMembers from '../components/teams/TeamMembers.vue'
import TeamsFooter from '../components/teams/TeamsFooter.vue'
import TeamsList from '../components/teams/TeamsList.vue'
import UsersFooter from '../components/users/UsersFooter.vue'
import UsersList from '../components/users/UsersList.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', redirect: '/teams' },
		{
			name: 'teams',
			path: '/teams',
			meta: { needsAuth: true },
			components: {
				default: TeamsList,
				footer: TeamsFooter,
			},
			children: [
				{
					name: 'team-members',
					path: ':teamId',
					component: TeamsMembers,
					props: true,
				},
			],
		},
		{
			path: '/users',
			components: {
				default: UsersList,
				footer: UsersFooter,
			},
			beforeEnter(to, from, next) {
				console.log('users beforeEnter')
				console.log(to, from)
				next()
			},
		},
		{ path: '/:catchAll(.*)', redirect: '/teams' },
	],
	scrollBehavior(_, _2, savedPosition) {
		// console.log(to, from, savedPosition)
		if (savedPosition) {
			return savedPosition
		}
		return { left: 0, top: 0 }
	},
})

router.beforeEach(function (to, from, next) {
	console.log('Global beforeEach')
	console.log(to, from)
	if (to.meta.needsAuth) {
		console.log('needsAuth')
		// next()
	}
	// if (to.name === 'team-members') {
	// 	next()
	// } else {
	// 	next({ name: 'team-members', params: { teamId: 't2' } })
	// }
	next()
})

router.afterEach(function (to, from) {
	// sending analytics data
	console.log('Global afterEach')
	console.log(to, from)
})

export default router
