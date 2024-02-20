import PropTypes from 'prop-types';

function ValidationMessage({ children }) {
	return <p className="text-red-500 text-sm mt-2 flex items-center space-x-2">{children}</p>;
}

ValidationMessage.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ValidationMessage;