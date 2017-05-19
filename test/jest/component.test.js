import React from 'react'
import renderer from 'react-test-renderer'

import Link from '../../src/Component'

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Link href="http://www.google.com">Google</Link>
  )
})
