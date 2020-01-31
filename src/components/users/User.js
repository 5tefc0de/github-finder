import React, { Fragment, useEffect, useContext } from 'react'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import Repos from '../repos/Repos'
import GitHubContext from '../../context/gitHub/gitHubContext'

const User = ({ match }) => {
  const gitHubContext = useContext(GitHubContext)

  const { getUser, loading, user, repos, getUserRepos } = gitHubContext

  useEffect(() => {
    getUser(match.params.login)
    getUserRepos(match.params.login)
    // eslint-disable-next-line
  }, [])

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
    company
  } = user

  if (loading) return <Spinner />

  console.log(name)

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back to Search
      </Link>
      Hireable: {''}
      {hireable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-time-circle text-danger' />
      )}
      <div className='card.grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            claaName='round-img'
            alt=''
            style={{ width: '150px' }}
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className='btn btn-dark my-1'>
            Visit GitHub Profil
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username:</strong> {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company:</strong> {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website:</strong> {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-success'>Following: {following}</div>
        <div className='badge badge-light'>Public Repos: {public_repos}</div>
        <div className='badge badge-dark'>Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  )
}

export default User