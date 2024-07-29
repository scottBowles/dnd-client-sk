import api from './api';
import type { JwtPayload } from '$lib/types';

const refreshAuthToken = async (refresh_token: string) => {
	console.log('start refreshAuthToken with refresh_token: ', refresh_token);
	const refreshResponse = await api({
		payload: {
			query: `
			mutation RefreshToken($refresh_token: String!) {
				refreshToken(input: { refreshToken: $refresh_token }) {
					success
					errors
					token {
						payload {
							origIat
							exp
							username
						}
						token
					}
					refreshToken {
						token
						created
						revoked
					}
				}
			}
		`,
			variables: { refresh_token }
		}
	});
	const json = (await refreshResponse.json()) as {
		data: {
			refreshToken: {
				success: boolean;
				errors: string[];
				token: { token: string; payload: JwtPayload };
				refreshToken: { token: string; created: string; revoked: string };
			};
		};
	};

	console.log('refreshAuthToken response: ', json);

	return json.data.refreshToken;
};

export default refreshAuthToken;
