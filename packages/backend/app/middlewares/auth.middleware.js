const { getAuth } = require('@clerk/express')

const authenticateUser = async (req, res, next) => {
    try {
        let auth
        let userId

        try {
            auth = getAuth(req)
            userId = auth?.userId
        } catch (authError) {
            // getAuth might throw if Clerk middleware hasn't processed the request properly
            console.error('getAuth error:', authError.message)
            return res.status(401).json({
                error: 'Authentication required',
                details: 'Invalid or missing token',
            })
        }

        if (!userId) {
            console.error('No userId found in request. Auth object:', auth)
            console.error(
                'Request headers:',
                req.headers.authorization
                    ? 'Authorization header present'
                    : 'No Authorization header'
            )
            return res.status(401).json({ error: 'Authentication required' })
        }

        // Attach user ID to request for use in controllers
        req.userId = userId

        next()
    } catch (error) {
        console.error('Auth middleware error:', error)
        console.error('Error stack:', error.stack)
        return res
            .status(500)
            .json({ error: 'Authentication failed', details: error.message })
    }
}

module.exports = authenticateUser
