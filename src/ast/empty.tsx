import React from 'react'

export default function EmptyIcon(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg width="200" height="200" {...props} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M839.2 101.3H184.9L65.3 539.5 64 922.7h896V549.3l-120.8-448zM241.9 176h540.3L884 549.3H678.7l-74.7 112H420l-74.7-112H140.1L241.9 176z"></path>
    </svg>
  )
}