import { Body, Button, Heading, Html, Text } from '@react-email/components'

export function WorkspaceInvite(props: {
  token: string
  confirmUrl: string
  workspace?: string
  invitedBy?: string
}) {
  return (
    <Html>
      <Body>
        <Heading>You have been invited</Heading>

        <Text>
          {props.invitedBy
            ? `${props.invitedBy} invited you`
            : "You've been invited"}{' '}
          to join {props.workspace ?? 'a workspace'} on Saas UI.
        </Text>

        <Button
          href={props.confirmUrl}
          style={{ background: '#000', color: '#fff', padding: '12px 20px' }}
        >
          Accept invitation
        </Button>
      </Body>
    </Html>
  )
}
