import { Modal } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../stores/store'

export const ModalContainer = observer(() => {
  const { modalStore } = useStore()
  return (
    <Modal
      open={modalStore.modal.isOpen}
      onClose={modalStore.closeModal}
      size="mini"
    >
      <Modal.Content>{modalStore.modal.body}</Modal.Content>
    </Modal>
  )
})
