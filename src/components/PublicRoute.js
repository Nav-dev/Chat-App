import React from 'react'
import { Redirect, Route} from 'react-router';
import { useProfile } from '../context/profile.context';
import { Container, Loader } from 'rsuite';

const PublicRoute = ({ children, ...routeProps}) => {

    const {profile, isLoading} = useProfile();

    if(isLoading && !profile){
      return (
      <Container>
        <Loader center vertical size = "md" content = "Loading" speed= "slow" />
      </Container>
      );
  }

    if(profile && !isLoading){
        return <Redirect to="/" />
    }

  return (
    <Route {...routeProps}>
        {children}
    </Route>
  )
}

export default PublicRoute