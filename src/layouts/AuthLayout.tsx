import { IRoute } from '@models/index';
import { Route, Switch } from 'react-router-dom';
import { routeAuth } from '@routes/index';
export function AuthLayout() {
    return (
        <>
            <Switch>
                {routeAuth.map((e: IRoute, key) => (
                    <Route key={key} {...e} />
                ))}
            </Switch>
        </>
    );
}
