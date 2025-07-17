import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Modal from '../components/modal/Modal';

describe('Modal Component', () => {
  beforeAll(() => {
    // Add a #modal-root element to the DOM for React Portals
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  });

  afterAll(() => {
    // Clean up the #modal-root element after tests
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
  });

  it('renders the modal when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <div>Modal Content</div>
      </Modal>
    );

    // Check if the modal content is rendered
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render the modal when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()}>
        <div>Modal Content</div>
      </Modal>
    );

    // Check if the modal content is not rendered
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('calls onClose when the overlay is clicked', () => {
    const onClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );

    // Click the overlay
    const overlay = screen.getByTestId('modal-overlay'); // The overlay is the parent of the modal content
    fireEvent.click(overlay!);

    // Check if onClose is called
    expect(onClose).toHaveBeenCalled();
  });

  it('does not call onClose when the modal content is clicked', () => {
    const onClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );

    // Click the modal content
    const modalContent = screen.getByText('Modal Content');
    fireEvent.click(modalContent);

    // Check if onClose is not called
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders the close icon and calls onClose when clicked', () => {
    const onClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );

    // Click the close icon
    const closeIcon = screen.getByTestId('modal-close-icon'); // Assuming the close icon is a button
    fireEvent.click(closeIcon);

    // Check if onClose is called
    expect(onClose).toHaveBeenCalled();
  });
});